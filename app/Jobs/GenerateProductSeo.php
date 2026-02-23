<?php

namespace App\Jobs;

use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GenerateProductSeo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $productId;

    /**
     * Create a new job instance.
     */
    public function __construct($productId)
    {
        $this->productId = $productId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $product = Product::find($this->productId);
        if (!$product) return;

        $seoMetadata = $product->seoMetadata;

        // Se esiste già SEO valorizzata, non sovrascrivere
        if ($seoMetadata) {
            $existing = $seoMetadata->only(['meta_title', 'meta_description', 'meta_keywords']);
            if (!empty(array_filter($existing))) {
                return;
            }
        }

        $baseUrl = rtrim(config('services.ollama.url', env('OLLAMA_BASE_URL', 'http://localhost:11434')), '/');

        $model = config('services.ollama.model', env('OLLAMA_MODEL', 'deepseek-v3.1:671b-cloud'));

        // Chiamata all'AI
        $response = Http::timeout(60)->retry(1, 200)->post($baseUrl . '/api/generate', [
            'model' => $model,
            'prompt' => "Genera metadati SEO per un prodotto e restituisci SOLO JSON con queste chiavi:
- meta_title: massimo 60 caratteri
- meta_description: massimo 160 caratteri
- meta_keywords: 5-8 keyword separate da virgola

Prodotto:
Nome: {$product->name}
Descrizione: {$product->description}",
            'stream' => false,
            'format' => 'json'
        ]);

        if (!$response->successful()) {
            Log::warning('Ollama SEO request failed', [
                'product_id' => $this->productId,
                'model' => $model,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return;
        }

        $error = $response->json('error');
        if ($error) {
            Log::warning('Ollama SEO response error', [
                'product_id' => $this->productId,
                'model' => $model,
                'error' => $error,
            ]);
            return;
        }

        $raw = $response->json('response');
        if (is_string($raw)) {
            $raw = preg_replace('/^```json\\s*|\\s*```$/i', '', trim($raw));
        }
        $seo = is_array($raw) ? $raw : json_decode($raw, true);
        if (!$seo && is_string($raw)) {
            if (preg_match('/\\{.*\\}/s', $raw, $match)) {
                $seo = json_decode($match[0], true);
            }
        }

        if (!$seo || empty(array_filter($seo))) {
            Log::warning('Ollama SEO response empty/invalid', [
                'product_id' => $this->productId,
                'model' => $model,
                'raw' => $response->json('response'),
            ]);
            return;
        }

        $product->seoMetadata()->updateOrCreate(
            ['seoable_id' => $product->id, 'seoable_type' => Product::class],
            [
                'meta_title' => $seo['meta_title'] ?? null,
                'meta_description' => $seo['meta_description'] ?? null,
                'meta_keywords' => $seo['meta_keywords'] ?? null,
            ]
        );
    }
}

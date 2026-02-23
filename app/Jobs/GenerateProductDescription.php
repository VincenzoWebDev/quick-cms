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

class GenerateProductDescription implements ShouldQueue
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

        // Se esiste già una descrizione, non sovrascrivere
        if (trim((string) $product->description) !== '') {
            return;
        }

        $baseUrl = rtrim(config('services.ollama.url', env('OLLAMA_BASE_URL', 'http://localhost:11434')), '/');

        $model = config('services.ollama.model', env('OLLAMA_MODEL', 'deepseek-v3.1:671b-cloud'));

        // Chiamata all'AI
        $response = Http::timeout(60)->retry(1, 200)->post($baseUrl . '/api/generate', [
            'model' => $model,
            'prompt' => "Genera una descrizione accattivante e SEO-friendly per un prodotto e-commerce.
La descrizione deve essere dettagliata, evidenziare i benefici e le caratteristiche principali.
Lunghezza: 200-300 parole.
Includi:
- Introduzione accattivante
- Caratteristiche principali
- Benefici per l'utente
- Call to action finale

Informazioni sul prodotto:
Nome: {$product->name}
Prezzo: {$product->price}
Categoria: " . ($product->categories->first()?->name ?? ''),
            'stream' => false
        ]);

        if (!$response->successful()) {
            Log::warning('Ollama description request failed', [
                'product_id' => $this->productId,
                'model' => $model,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return;
        }

        $error = $response->json('error');
        if ($error) {
            Log::warning('Ollama description response error', [
                'product_id' => $this->productId,
                'model' => $model,
                'error' => $error,
            ]);
            return;
        }

        $description = $response->json('response');
        if (is_string($description)) {
            $description = trim(preg_replace('/^```\\w*\\s*|\\s*```$/i', '', $description));
        }

        if (!$description || (is_string($description) && trim($description) === '')) {
            Log::warning('Ollama description response empty/invalid', [
                'product_id' => $this->productId,
                'model' => $model,
                'raw' => $response->json('response'),
            ]);
            return;
        }

        if ($description) {
            $product->update([
                'description' => $description
            ]);
        }
    }
}

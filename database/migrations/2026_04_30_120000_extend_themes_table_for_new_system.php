<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('themes', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('name');
            $table->string('type')->default('content')->after('path');
            $table->text('description')->nullable()->after('type');
            $table->foreignId('parent_theme_id')->nullable()->after('description')->constrained('themes')->nullOnDelete();
            $table->string('status')->default('draft')->after('parent_theme_id');
            $table->string('manifest_path')->nullable()->after('status');
            $table->boolean('has_scaffold')->default(false)->after('manifest_path');
        });

        DB::table('themes')->orderBy('id')->get()->each(function ($theme) {
            $slug = $theme->slug ?: Str::slug($theme->name, '_');
            $pagePath = resource_path('js/Pages/Front/Themes/' . $slug);
            $layoutPath = resource_path('views/layouts/' . $slug . '/app.blade.php');
            $manifestPath = resource_path('themes/' . $slug . '/theme.json');
            $hasScaffold = File::isDirectory($pagePath) && File::exists($layoutPath);

            DB::table('themes')
                ->where('id', $theme->id)
                ->update([
                    'slug' => $slug,
                    'type' => $theme->type ?: 'content',
                    'status' => $theme->status ?: 'ready',
                    'has_scaffold' => $hasScaffold,
                    'manifest_path' => $theme->manifest_path ?: (File::exists($manifestPath) ? 'resources/themes/' . $slug . '/theme.json' : null),
                    'path' => $theme->path ?: 'resources/js/Pages/Front/Themes/' . $slug,
                ]);
        });
    }

    public function down(): void
    {
        Schema::table('themes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('parent_theme_id');
            $table->dropColumn([
                'slug',
                'type',
                'description',
                'status',
                'manifest_path',
                'has_scaffold',
            ]);
        });
    }
};

<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FileController extends \App\Http\Controllers\Controller
{
    private const ALLOWED_EXTENSIONS = [
        'jpg', 'png', 'jpeg', 'gif', 'webp', 'svg',
        'pdf', 'doc', 'docx', 'odt',
        'mp4', 'webm', 'ogv', 'mkv',
    ];

    private function resolveRelativeUploadPath(string $fileName): string
    {
        return config('app.uploads_dir') . basename($fileName);
    }

    public function index()
    {
        $publicPath = public_path('storage/' . config('app.uploads_dir'));
        if (File::isDirectory($publicPath)) {
            $files = File::files($publicPath);
            $files = collect($files)->map(function ($file) {
                $lastModified = File::lastModified($file);
                return [
                    'name' => basename($file),
                    'last_modified' => $lastModified,
                ];
            })->sortByDesc('last_modified');
            $files = $files->values()->all();
        } else {
            $files = [];
        }

        return Inertia::render('Admin/Files/FilesContent', ['files' => $files]);
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'fileName' => ['required', 'string'],
        ]);

        $relativePath = $this->resolveRelativeUploadPath($request->input('fileName'));
        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }

        return back();
    }

    public function fileDownload(Request $request)
    {
        $res = $request->get('res');
        $request->validate([
            'fileName' => ['required', 'string'],
        ]);

        $fileName = basename($request->input('fileName'));
        $relativePath = $this->resolveRelativeUploadPath($fileName);
        if (!Storage::disk('public')->exists($relativePath)) {
            return response()->json(['message' => 'File non trovato'], 404);
        }

        $messaggio = $res ? 'Download immagine: ' . $fileName . ' - Avvenuto correttamente' : 'Problema con il download dell\'immagine: ' . $fileName;
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        return response()->download(Storage::disk('public')->path($relativePath));
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file'],
        ]);

        $file = $request->file('file');
        $fileExtension = strtolower($file->extension());
        if (!in_array($fileExtension, self::ALLOWED_EXTENSIONS, true)) {
            return back()->withErrors(['file' => 'Formato file non supportato']);
        }

        $fileNameExt = $file->getClientOriginalName();
        $fileName = pathinfo($fileNameExt, PATHINFO_FILENAME);
        $fileName = str_replace(' ', '_', $fileName);
        $fileName = $fileName . '_' . time() . '.' . $fileExtension;
        $file->storeAs(config('app.uploads_dir'), $fileName, 'public');

        return back();
    }

    public function images()
    {
        $publicPath = public_path('storage/' . config('app.uploads_dir'));
        if (File::isDirectory($publicPath)) {
            $files = File::files($publicPath);
            $filteredFiles = collect($files)->filter(function ($file) {
                $extension = pathinfo($file, PATHINFO_EXTENSION);
                // Verifica se l'estensione del file è tra le immagini supportate
                return in_array($extension, ['jpg', 'png', 'jpeg', 'gif', 'webp', 'svg']);
            })->map(function ($file) {
                $lastModified = File::lastModified($file);
                return [
                    'name' => basename($file),
                    'last_modified' => $lastModified,
                ];
            })->sortByDesc('last_modified')->values()->all();
        } else {
            $filteredFiles = [];
        }

        return Inertia::render('Admin/Files/FilesContent', ['files' => $filteredFiles]);
    }

    public function documents()
    {
        $publicPath = public_path('storage/' . config('app.uploads_dir'));
        if (File::isDirectory($publicPath)) {
            $files = File::files($publicPath);
            $filteredFiles = collect($files)->filter(function ($file) {
                $extension = pathinfo($file, PATHINFO_EXTENSION);
                // Verifica se l'estensione del file è tra le immagini supportate
                return in_array($extension, ['pdf', 'doc', 'docx', 'odt']);
            })->map(function ($file) {
                $lastModified = File::lastModified($file);
                return [
                    'name' => basename($file),
                    'last_modified' => $lastModified,
                ];
            })->sortByDesc('last_modified')->values()->all();
        } else {
            $filteredFiles = [];
        }

        return Inertia::render('Admin/Files/FilesContent', ['files' => $filteredFiles]);
    }

    public function video()
    {
        $publicPath = public_path('storage/' . config('app.uploads_dir'));
        if (File::isDirectory($publicPath)) {
            $files = File::files($publicPath);
            $filteredFiles = collect($files)->filter(function ($file) {
                $extension = pathinfo($file, PATHINFO_EXTENSION);
                // Verifica se l'estensione del file è tra le immagini supportate
                return in_array($extension, ['mp4', 'webm', 'ogv', 'mkv']);
            })->map(function ($file) {
                $lastModified = File::lastModified($file);
                return [
                    'name' => basename($file),
                    'last_modified' => $lastModified,
                ];
            })->sortByDesc('last_modified')->values()->all();
        } else {
            $filteredFiles = [];
        }

        return Inertia::render('Admin/Files/FilesContent', ['files' => $filteredFiles]);
    }
}

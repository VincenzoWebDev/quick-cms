<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FileController extends \App\Http\Controllers\Controller
{
    public function index()
    {
        $publicPath = public_path('storage/' . env('UPLOADS_DIR'));
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
        $fileName = $request->get('fileName');
        $filePath = public_path('storage/' . env('UPLOADS_DIR') . $fileName);
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    public function fileDownload(Request $request)
    {
        $res = $request->get('res');
        $fileName = $request->get('fileName');
        $filePath = public_path('storage/' . env('UPLOADS_DIR') . $fileName);
        if (!file_exists($filePath)) {
            return response()->json(['message' => 'File non trovato'], 404);
        }

        $messaggio = $res ? 'Download immagine: ' . $fileName . ' - Avvenuto correttamente' : 'Problema con il download dell\'immagine: ' . $fileName;
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        return response()->download($filePath);
    }

    public function store(Request $request)
    {
        $file = $request->file('file');
        $fileExtension = $file->extension();
        $fileNameExt = $file->getClientOriginalName();
        $fileName = pathinfo($fileNameExt, PATHINFO_FILENAME);

        if ($fileExtension == 'jpg' || $fileExtension == 'png' || $fileExtension == 'jpeg' || $fileExtension == 'gif' || $fileExtension == 'webp' || $fileExtension == 'svg') {
            $fileName = str_replace(' ', '_', $fileName);
            $fileName = $fileName . '_' . time() . '.' . $fileExtension;
            $file->storeAs(env('UPLOADS_DIR'), $fileName, 'public');
        }
        if ($fileExtension == 'pdf' || $fileExtension == 'doc' || $fileExtension == 'docx' || $fileExtension == 'odt') {
            $fileName = str_replace(' ', '_', $fileName);
            $fileName = $fileName . '_' . time() . '.' . $fileExtension;
            $file->storeAs(env('UPLOADS_DIR'), $fileName, 'public');
        }
        if ($fileExtension == 'mp4' || $fileExtension == 'webm' || $fileExtension == 'ogv' || $fileExtension == 'mkv') {
            $fileName = str_replace(' ', '_', $fileName);
            $fileName = $fileName . '_' . time() . '.' . $fileExtension;
            $file->storeAs(env('UPLOADS_DIR'), $fileName, 'public');
        }
    }

    public function images()
    {
        $publicPath = public_path('storage/' . env('UPLOADS_DIR'));
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
        $publicPath = public_path('storage/' . env('UPLOADS_DIR'));
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
        $publicPath = public_path('storage/' . env('UPLOADS_DIR'));
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

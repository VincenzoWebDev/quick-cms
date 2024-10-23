<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\EditProductRequest;
use App\Http\Requests\ProductFilterRequest;
use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\ProductVariantValue;
use App\Models\VariantCombination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Support\Str;

class ProductController extends \App\Http\Controllers\Controller
{

    public function index(ProductFilterRequest $request)
    {
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $perPage = $request->input('perPage', 10);
        $searchQuery = $request->input('q', '');

        $products = Product::with('categories')->orderBy($sortBy, $sortDirection)
            ->when($searchQuery, function ($query) use ($searchQuery) {
                $query->where(function ($query) use ($searchQuery) {
                    $query->where('name', 'like', '%' . $searchQuery . '%')
                        ->orWhere('price', 'like', '%' . $searchQuery . '%')
                        ->orWhere('stock', 'like', '%' . $searchQuery . '%')
                        ->orWhereHas('categories', function ($query) use ($searchQuery) {
                            $query->where('name', 'like', '%' . $searchQuery . '%');
                        });
                });
            })
            ->paginate($perPage);

        // $products = Product::with('categories')->orderBy('id', 'desc')->get();
        return Inertia::render('Admin/Products/ProductsContent', [
            'products' => $products,
            'sortBy' => $sortBy,
            'sortDirection' => $sortDirection,
            'perPage' => $perPage,
            'sortSearch' => $searchQuery,
        ]);
    }

    function createSlug($title)
    {
        return Str::slug($title);
    }

    public function create()
    {
        $categories = Category::orderBy('name', 'asc')->get();
        $variants = ProductVariant::orderBy('name', 'asc')->with('values')->get();

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
            'selectedCategories' => [],
            'variants' => $variants,
        ]);
    }

    public function store(ProductRequest $request)
    {
        $product = new Product();
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->stock = $request->input('stock');
        $product->slug = $this->createSlug($request->input('name'));
        $product->image_path = '';
        $res = $product->save();

        if ($res) {
            if ($request->input('variantCombinations') != null) {
                $this->processVariantCombinations($request->input('variantCombinations'), $product->id);
            }
        }

        if ($res) {
            if ($request->has('categories') > 0) {
                $product->categories()->attach($request->categories);
            }
        }
        if ($res) {
            if ($request->hasFile('image_path')) {
                $this->processThumb($request, $product);
            }
            if (is_array($request->file('gallery'))) {
                $this->processGallery($request, $product);
            }
        }

        $messaggio = $res ? 'Prodotto ID : ' . $product->id . ' - Inserito correttamente' : 'Prodotto ID : ' . $product->id . ' - Non Inserito';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('products.index');
    }

    // public function processVariantCombinations($combinations, $productId)
    // {
    //     $stock = DB::table('products')->where('id', $productId)->value('stock');
    //     foreach ($combinations as $combination) {
    //         $combinationId = DB::table('variant_combinations')->insertGetId([
    //             'product_id' => $productId,
    //             'price' => $combination['price'],
    //             'sku' => $combination['sku'],
    //             'ean' => $combination['ean'],
    //             'quantity' => $combination['quantity'],
    //         ]);
    //         // Inserisci nelle varianti collegate
    //         // $colorId = DB::table('product_variant_values')->where('value', $combination['color'])->value('id');
    //         // $sizeId = DB::table('product_variant_values')->where('value', $combination['size'])->value('id');

    //         // Associa la combinazione a taglia e colore
    //         if ($combination['color_id'] != null && $combination['size_id'] != null) {
    //             DB::table('variant_combination_values')->insert([
    //                 ['variant_combination_id' => $combinationId, 'product_variant_value_id' => $combination['color_id']],
    //                 ['variant_combination_id' => $combinationId, 'product_variant_value_id' => $combination['size_id']]
    //             ]);
    //         } else if ($combination['color_id'] != null) {
    //             DB::table('variant_combination_values')->insert([
    //                 ['variant_combination_id' => $combinationId, 'product_variant_value_id' => $combination['color_id']]
    //             ]);
    //         } else if ($combination['size_id'] != null) {
    //             DB::table('variant_combination_values')->insert([
    //                 ['variant_combination_id' => $combinationId, 'product_variant_value_id' => $combination['size_id']]
    //             ]);
    //         }

    //         $stock += $combination['quantity'];
    //     }
    //     DB::table('products')->where('id', $productId)->update(['stock' => $stock]);
    // }

    public function processVariantCombinations($combinations, $productId)
    {
        // Recupera lo stock corrente del prodotto
        $stock = DB::table('products')->where('id', $productId)->value('stock');

        foreach ($combinations as $combination) {
            // Inserisci la combinazione nel database con prezzo, sku, ean e quantità
            $combinationId = DB::table('variant_combinations')->insertGetId([
                'product_id' => $productId,
                'price' => $combination['price'],
                'sku' => $combination['sku'],
                'ean' => $combination['ean'],
                'quantity' => $combination['quantity'],
            ]);

            // Itera su tutte le chiavi di combinazione che iniziano con "variant_"
            foreach ($combination as $key => $value) {
                if (strpos($key, 'variant_') === 0) {
                    // Estrai l'ID della variante dal nome della chiave (es: "variant_1" diventa 1)
                    $variantId = str_replace('variant_', '', $key);

                    // Recupera l'ID del valore della variante dal database in base al valore (es: "rosso", "L", ecc.)
                    $variantValueId = DB::table('product_variant_values')
                        ->where('product_variant_id', $variantId)
                        ->where('value', $value)
                        ->value('id');

                    // Associa la combinazione al valore della variante
                    if ($variantValueId) {
                        DB::table('variant_combination_values')->insert([
                            'variant_combination_id' => $combinationId,
                            'product_variant_value_id' => $variantValueId,
                        ]);
                    }
                }
            }

            // Aggiungi la quantità della combinazione allo stock totale del prodotto
            $stock += $combination['quantity'];
        }

        // Aggiorna lo stock totale del prodotto nel database
        DB::table('products')->where('id', $productId)->update(['stock' => $stock]);
    }


    public function edit(Product $product)
    {
        $dbDriver = DB::getDriverName();

        $categories = Category::orderBy('name', 'asc')->get();
        $selectedCategories = $product->categories->pluck('id')->toArray();
        $productImages = $product->productImages;
        $variants = ProductVariant::orderBy('name', 'asc')->with('values')->get();

        if ($dbDriver === 'mysql') {
            $variantCombinationsGroup = VariantCombination::from('variant_combinations as vc')
                ->select(
                    'vc.id as combination_id',
                    'vc.product_id',
                    'vc.price',
                    'vc.stock',
                    'vc.sku',
                    'vc.ean',
                    'vc.quantity',
                    DB::raw('GROUP_CONCAT(pv.name ORDER BY pv.id ASC) as variant_name'),
                    DB::raw('GROUP_CONCAT(pvv.value ORDER BY pvv.id ASC) as variant_value')
                )
                ->join('variant_combination_values as vcv', 'vc.id', '=', 'vcv.variant_combination_id')
                ->join('product_variant_values as pvv', 'vcv.product_variant_value_id', '=', 'pvv.id')
                ->join('product_variants as pv', 'pvv.product_variant_id', '=', 'pv.id')
                ->where('vc.product_id', $product->id)
                ->groupBy(
                    'vc.id',
                    'vc.product_id',
                    'vc.price',
                    'vc.stock',
                    'vc.sku',
                    'vc.ean',
                    'vc.quantity'
                )
                ->get();
        } elseif ($dbDriver === 'pgsql') {
            $variantCombinationsGroup = VariantCombination::from('variant_combinations as vc')
                ->select(
                    'vc.id as combination_id',
                    'vc.product_id',
                    'vc.price',
                    'vc.stock',
                    'vc.sku',
                    'vc.ean',
                    'vc.quantity',
                    DB::raw('STRING_AGG(pv.name, \',\' ORDER BY pv.id ASC) as variant_name'),
                    DB::raw('STRING_AGG(pvv.value, \',\' ORDER BY pvv.id ASC) as variant_value')
                )
                ->join('variant_combination_values as vcv', 'vc.id', '=', 'vcv.variant_combination_id')
                ->join('product_variant_values as pvv', 'vcv.product_variant_value_id', '=', 'pvv.id')
                ->join('product_variants as pv', 'pvv.product_variant_id', '=', 'pv.id')
                ->where('vc.product_id', $product->id)
                ->groupBy(
                    'vc.id',
                    'vc.product_id',
                    'vc.price',
                    'vc.stock',
                    'vc.sku',
                    'vc.ean',
                    'vc.quantity'
                )
                ->get();
        }

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'selectedCategories' => $selectedCategories,
            'productImages' => $productImages,
            'variants' => $variants,
            'variantCombinationsGroup' => $variantCombinationsGroup,
        ]);
    }

    public function update(EditProductRequest $request, Product $product)
    {
        $oldProductName = $product->name;
        $oldDescription = $product->description;
        $oldPrice = $product->price;
        $oldStock = $product->stock;
        $oldImage = $product->image_path;
        $oldGallery = $product->productImages->pluck('image_path')->toArray();
        $oldSlug = $product->slug;

        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->stock = $request->input('stock');
        $product->image_path = $request->input('image_path') == null ? $oldImage : $request->input('image_path');
        $catProduct = $product->categories()->sync($request->categories);
        $product->slug = $this->createSlug($request->input('name'));

        if (
            $oldProductName != $product->name || $oldDescription != $product->description || $oldPrice != $product->price || $oldStock != $product->stock ||
            $oldImage != $product->image_path || $catProduct['attached'] != null || $catProduct['detached'] != null || $request->hasFile('image_path') ||
            $request->file('gallery') != null || $request->variantCombinations != null || $oldSlug != $product->slug
        ) {
            if ($request->hasFile('image_path')) {
                $this->deleteThumb($oldImage);
                $this->processThumb($request, $product);
            }
            if ($request->file('gallery') != null) {
                $this->deleteGallery($oldGallery);
                $product->productImages()->delete();
                $this->processGallery($request, $product);
            }
            if ($request->variantCombinations != null) {
                $this->processVariantCombinations($request->variantCombinations, $product->id);
            }
            $res = $product->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? 'Prodotto ID : ' . $product->id . ' - Aggiornato correttamente' : 'Prodotto ID : ' . $product->id . ' - Non aggiornato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $productThumb = $product->image_path;
        $productGallery = $product->productImages->pluck('image_path')->toArray();

        if ($product->categories->count() > 0) {
            $product->categories()->detach();
        }
        if ($product->combinations()->count() > 0) {
            $product->combinations->each(function ($combination) {
                $combination->variantCombinationValues()->delete();
            });
            $product->combinations()->delete();
        }
        $res = $product->delete();
        if ($res) {
            $this->deleteThumb($productThumb);
            $this->deleteGallery($productGallery);
        }
    }

    public function destroyBatch(Request $request)
    {
        $recordIds = $request->input('recordIds');
        if ($recordIds == null) {
            return;
        }
        foreach ($recordIds as $recordId) {
            $product = Product::findOrFail($recordId);
            $productThumb = $product->image_path;
            $productGallery = $product->productImages->pluck('image_path')->toArray();

            if ($product->categories->count() > 0) {
                $product->categories()->detach();
            }
            if ($product->combinations()->count() > 0) {
                $product->combinations->each(function ($combination) {
                    $combination->variantCombinationValues()->delete();
                });
                $product->combinations()->delete();
            }
            $res = Product::where('id', $recordId)->delete();
            if ($res) {
                $this->deleteThumb($productThumb);
                $this->deleteGallery($productGallery);
            }
        }
    }

    public function imagesDestroy(ProductImage $productImage)
    {
        if (!$productImage) {
            return false;
        }
        $res = $productImage->delete();
        if ($res) {
            $this->deleteImage($productImage);
        }
    }
    public function imagesDestroyBatch(Request $request)
    {
        dd($request->all());
        $recordIds = $request->input('recordIds');
        if ($recordIds == null) {
            return;
        }
        foreach ($recordIds as $recordId) {
            $productImage = ProductImage::findOrFail($recordId);
            $res = $productImage->delete();
            if ($res) {
                $this->deleteImage($productImage);
            }
        }
    }

    public function deleteThumb($thumb)
    {
        if (!empty($thumb)) {
            $thumbPath = public_path('storage/' . $thumb);
            $folderPathThumb = dirname($thumb);
            if (file_exists($thumbPath)) {
                unlink($thumbPath);
            }
            if (empty(Storage::disk(env('IMG_DISK'))->files($folderPathThumb))) {
                Storage::disk(env('IMG_DISK'))->deleteDirectory($folderPathThumb);
            }
        }
    }
    public function deleteGallery($galleryPath)
    {
        if (!empty($galleryPath)) {
            foreach ($galleryPath as $image) {
                $imagePath = public_path('storage/' . $image);
                $folderPathImage = dirname($image);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
                if (empty(Storage::disk(env('IMG_DISK'))->files($folderPathImage))) {
                    Storage::disk(env('IMG_DISK'))->deleteDirectory($folderPathImage);
                }
            }
        }
    }

    public function processThumb($request, &$product)
    {
        if (!$request->hasFile('image_path')) {
            return false;
        }
        $file = $request->file('image_path');
        if (!$file->isValid()) {
            return false;
        }
        $productName = str_replace(' ', '_', $product->name);
        $fileName = $productName . '_' . $product->id . '.' . $file->extension();
        $dirProductId = 'product_' . $product->id;
        $file->storeAs(env('IMG_PRODUCT_THUMB_DIR') . $dirProductId, $fileName, 'public');
        $filePath = public_path('storage/' . env('IMG_PRODUCT_THUMB_DIR') . $dirProductId . '/' . $fileName);
        $this->createThumbnail($filePath);
        $product->image_path = env('IMG_PRODUCT_THUMB_DIR') . $dirProductId . '/' . $fileName;
        $res = $product->save();
        return $res;
    }

    public function processGallery($request, &$product)
    {
        if (!is_array($request->file('gallery'))) {
            return false;
        }
        $files = $request->file('gallery');
        if (is_array($files)) {
            if (count($files) > 0) {
                $count = 0;
                foreach ($files as $file) {
                    if (!$file->isValid()) {
                        return false;
                    }
                    $productName = str_replace(' ', '_', $product->name);
                    $fileName = $productName . '_' . $product->id . '_' . $count . '_' . time() . '.' . $file->extension();
                    $dirProductId = 'product_' . $product->id;
                    $file->storeAs(env('IMG_PRODUCT_GALLERY_DIR') . $dirProductId, $fileName, 'public');
                    $filePath = public_path('storage/' . env('IMG_PRODUCT_GALLERY_DIR') . $dirProductId . '/' . $fileName);
                    $this->createThumbnail($filePath);

                    $product_images = new ProductImage();
                    $product_images->product_id = $product->id;
                    $product_images->image_path = env('IMG_PRODUCT_GALLERY_DIR') . $dirProductId . '/' . $fileName;
                    $res = $product_images->save();
                    $count++;
                }
                return $res;
            }
        }
    }

    public function deleteImage($productImage)
    {
        $disk = env('IMG_DISK');
        if ($productImage->image_path && Storage::disk($disk)->exists($productImage->image_path)) {
            $fileDeleted = Storage::disk($disk)->delete($productImage->image_path);

            $folderPathImg = dirname($productImage->image_path);

            $filesInFolderImg = Storage::disk($disk)->files($folderPathImg);
            if (empty($filesInFolderImg)) {
                Storage::disk($disk)->deleteDirectory($folderPathImg);
            }

            return $fileDeleted;
        }
        return false;
    }

    public function createThumbnail($filePath)
    {
        try {
            $manager = new ImageManager(new Driver());
            $image = $manager->read($filePath);
            // resize image proportionally to 300px width
            $image->scale(width: 600);
            $image->save($filePath);
        } catch (\Exception $e) {
            return false;
        }
    }

    public function destroyCombination($id)
    {
        $combination = VariantCombination::find($id);
        $product = Product::find($combination->product_id);
        $combination->delete();
        if ($product->combinations->count() == 0) {
            $product->stock = 0;
            $product->update();
        } else if ($product->combinations->count() > 0) {
            $product->stock = $product->combinations->sum('quantity');
            $product->update();
        }
    }

    public function destroyCombinationBatch(Request $request)
    {
        $recordIds = $request->input('recordIds');
        if ($recordIds == null) {
            return;
        }
        foreach ($recordIds as $id) {
            $this->destroyCombination($id);
        }
    }

    public function updateCombination($id, Request $request)
    {
        $combination = VariantCombination::find($id);
        $oldCombinationQuantity = $combination->quantity;
        $combination->price = $request->input('price');
        $combination->sku = $request->input('sku');
        $combination->ean = $request->input('ean');
        $combination->quantity = $request->input('quantity');

        if ($oldCombinationQuantity != $request->input('quantity')) {
            $product = Product::find($combination->product_id);
            $product->stock = $product->stock - $oldCombinationQuantity + $request->input('quantity');
            $product->update();
        }

        $combination->save();
    }
}

<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Image Driver
    |--------------------------------------------------------------------------
    |
    | Intervention Image supports “GD Library” and “Imagick” to process images
    | internally. Depending on your PHP setup, you can choose one of them.
    |
    | Included options:
    |   - \Intervention\Image\Drivers\Gd\Driver::class
    |   - \Intervention\Image\Drivers\Imagick\Driver::class
    |
    */

    'driver' => \Intervention\Image\Drivers\Gd\Driver::class,

    /* Variabili d'ambiente personalizzate */
    'img_dir' => env('IMG_DIR', 'images/'),
    'photo_albums' => env('IMG_PHOTO_ALBUMS', 'images/photo_albums/'),
    'photo_album_thumbs' => env('IMG_PHOTO_ALBUM_THUMBS', 'images/photo_album_thumb/'),
    'album_thumb_dir' => env('ALBUM_THUMB_DIR', 'images/album_thumbs/'),
    'profile_img_dir' => env('PROFILE_IMG_DIR', 'images/profile_img/'),
    'img_page_dir' => env('IMG_PAGE_DIR', 'images/pages/uploads/'),
    'product_thumb_dir' => env('IMG_PRODUCT_THUMB_DIR', 'images/product_img/thumb/'),
    'product_gallery_dir' => env('IMG_PRODUCT_GALLERY_DIR', 'images/product_img/gallery/'),
    'img_per_page' => env('IMG_PER_PAGE', 10),

];

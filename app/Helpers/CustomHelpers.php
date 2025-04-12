<?php

use App\Models\Setting;

if (!function_exists('setting')) {
    function setting($key, $default = null)
    {
        static $settings = [];

        if (empty($settings)) {
            $settings = Setting::all()->pluck('value', 'key')->toArray();
        }

        return $settings[$key] ?? $default;
    }
}

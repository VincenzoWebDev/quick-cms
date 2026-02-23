<?php

use Inertia\Testing\AssertableInertia;

test('home page loads inertia component', function () {
    $this->get(route('home'))
        ->assertInertia(
            fn(AssertableInertia $page) =>
            $page->component('Front/Themes/default/HomeComponent') // il componente Vue/React che ritorni
        );
});

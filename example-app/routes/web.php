<?php

use Illuminate\Support\Facades\Route;

// routes/web.php
Route::group(['middleware' => 'admin'], function() {
    Route::get('/admin', 'AdminController@index')->name('admin.home');
    Route::resource('listings', 'ListingController');
});


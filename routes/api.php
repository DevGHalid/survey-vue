<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {
  Route::post('/login', 'LoginController@login')->name('login');
  Route::post('/logout', 'LoginController@logout')->name('logout');
});

Route::namespace('Api')->group(function() {
  Route::prefix('/forms')->group(function() {
    Route::get('/', 'FormController@index');

    Route::post('/create', 'FormController@create');

    Route::delete('/{id}/delete', 'FormController@destroy');

    Route::get('/{id}/sheets', 'FormController@showSheets');
  });

  Route::prefix('/sheets')->group(function() {
    Route::get('/', 'SheetController@answers');

    Route::post('/create', 'SheetController@create');
  });

  Route::prefix('/type-questions')->group(function() {
    Route::get('/', 'TypeQuestionController@index');
  });
});

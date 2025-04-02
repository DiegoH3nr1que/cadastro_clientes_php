<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ApiExternalController;
use Illuminate\Support\Facades\Route;

Route::get('/clientes', [ClienteController::class, 'index']);
Route::post('/clientes', [ClienteController::class, 'store']);
Route::get('/logs', [ApiExternalController::class, 'index']);
Route::delete('/clientes/{id}', [ClienteController::class, 'destroy']);

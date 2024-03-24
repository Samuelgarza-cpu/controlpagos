<?php

use App\Http\Controllers\AreaInfluenciaController;
use App\Http\Controllers\EstructuraController;
use App\Http\Controllers\ImagenPruebaController;
use App\Http\Controllers\NivelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TipoEleccionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('registros', App\Http\Controllers\RegistrosController::class);
    Route::get('/imagen', [ImagenPruebaController::class, 'index'])->name('img.index');
    Route::get('/imagen/create', [ImagenPruebaController::class, 'create'])->name('img.create');
    Route::post('/imagen', [ImagenPruebaController::class, 'store'])->name('img.store');
    Route::delete('/imagen/{imagenPrueba}', [ImagenPruebaController::class, 'destroy'])->name('img.destroy');
});

Route::prefix('control')->middleware('auth')->group(function () {
    Route::get('niveles', [NivelController::class, 'index'])->name('niveles.index');
    Route::get('areas-influencia', [AreaInfluenciaController::class, 'index'])->name('areas.index');
    Route::get('areas-influencia/create', [AreaInfluenciaController::class, 'create'])->name('areas.create');
    Route::delete('areas-influencia/{areaInfluencia}', [AreaInfluenciaController::class, 'destroy'])->name('areas.destroy');
    Route::get('areas-influencia/{areaInfluencia}/edit', [AreaInfluenciaController::class, 'edit'])->name('areas.edit');
    Route::post('areas-influencia/{areaInfluencia}', [AreaInfluenciaController::class, 'update'])->name('areas.update');
    Route::post('areas-influencia', [AreaInfluenciaController::class, 'store'])->name('areas.store');
    Route::get('estructuras', [EstructuraController::class, 'index'])->name('estructuras.index');
    Route::get('tipo-eleccion', [TipoEleccionController::class, 'index'])->name('tipos.index');
});

require __DIR__ . '/auth.php';

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
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return to_route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('registros', App\Http\Controllers\RegistrosController::class);

    //    ---------------------  EJEMPLO DE SUBIR IMAGENES ----------------------
    Route::get('/imagen', [ImagenPruebaController::class, 'index'])->name('img.index');   //EN EL INDEX SE MUESTRA LA TABLA, TIENE BOTON PARA LLAMAR AL CREATE
    Route::get('/imagen/create', [ImagenPruebaController::class, 'create'])->name('img.create'); // EN EL CREATE SE MUESTRA EL FORMULARIO
    Route::post('/imagen', [ImagenPruebaController::class, 'store'])->name('img.store'); // DESDE EL CREATE EN EL FORM SE ENVIA LA DATA A STORE
    Route::delete('/imagen/{imagenPrueba}', [ImagenPruebaController::class, 'destroy'])->name('img.destroy');
});

Route::prefix('control')->middleware('auth')->group(function () {
    // -------------------------------------------AREA DE INFLUENCIA----------------------------------------------
    Route::get('areas-influencia', [AreaInfluenciaController::class, 'index'])->name('areas.index');
    Route::get('areas-influencia/create', [AreaInfluenciaController::class, 'create'])->name('areas.create');
    Route::post('areas-influencia', [AreaInfluenciaController::class, 'store'])->name('areas.store');
    Route::get('areas-influencia/{areaInfluencia}/edit', [AreaInfluenciaController::class, 'edit'])->name('areas.edit'); //EDIT SE MANDA A LLAMAR DESDE LA TABLA DEL INDEX
    Route::post('areas-influencia/{areaInfluencia}', [AreaInfluenciaController::class, 'update'])->name('areas.update'); //EN UPDATE VIENE LA DATA ACTUALIZADA DE EDIT
    Route::delete('areas-influencia/{areaInfluencia}', [AreaInfluenciaController::class, 'destroy'])->name('areas.destroy');

    // --------------------------------------------------NIVELES------------------------------------------------------
    Route::get('niveles', [NivelController::class, 'index'])->name('niveles.index');


    // --------------------------------------------------ESTRUCTURAS------------------------------------------------------
    Route::get('estructura', [EstructuraController::class, 'index'])->name('estructuras.index');
    Route::get('estructura/create', [EstructuraController::class, 'create'])->name('estructuras.create');
    Route::post('estructura', [EstructuraController::class, 'store'])->name('estructuras.store');
    Route::get('estructura/{estructura}/edit', [EstructuraController::class, 'edit'])->name('estructuras.edit');
    Route::post('estructura/{estructura}', [EstructuraController::class, 'update'])->name('estructuras.update');
    Route::delete('estructura/{estructuraBorrar}', [EstructuraController::class, 'destroy'])->name('estructuras.destroy');



    // -----------------------------------TIPO DE ELECCIONES-----------------------------------------------------
    Route::get('tipo-eleccion', [TipoEleccionController::class, 'index'])->name('tipos.index');
});

require __DIR__ . '/auth.php';

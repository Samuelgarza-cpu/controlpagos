<?php

namespace App\Http\Controllers;

use App\Http\Requests\Imagen\StoreRequest;
use App\Models\ImagenPrueba;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImagenPruebaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $imagenes = ImagenPrueba::all();
        return Inertia::render('Imagen/Index', compact('imagenes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Imagen/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {

        $data = $request->only('nombre', 'ruta', 'anime');

        if ($request->hasFile('ruta')) {
            $file = $request->file('ruta');
            $routeImage = $file->store('avatars', ['disk' => 'public']);
            $data['ruta'] = $routeImage;
        }
        ImagenPrueba::create($data);

        return to_route('img.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ImagenPrueba $imagenPrueba)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ImagenPrueba $imagenPrueba)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ImagenPrueba $imagenPrueba)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ImagenPrueba $imagenPrueba)
    {
        if ($imagenPrueba->ruta) {
            Storage::disk('public')->delete($imagenPrueba->ruta);
        }
        $imagenPrueba->delete();
    }
}

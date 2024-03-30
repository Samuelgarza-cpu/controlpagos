<?php

namespace App\Http\Controllers;

use App\Http\Requests\Estructura\StoreRequest;
use App\Models\Estructura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EstructuraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->role_id != 1) {
            return to_route('registros.index');
        }
        $estructuras = Estructura::all();
        return Inertia::render('Estructura/Index', compact('estructuras'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Estructura/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('nombreEstructura');
        $data['fake'] = 'Demo';

        Estructura::create($data);
        return to_route('estructuras.index');
    }


    public function edit(Estructura $estructura)
    {
        return Inertia::render('Estructura/Edit', compact('estructura'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Estructura $estructura)
    {
        $data = $request->only('nombreEstructura');
        $estructura->update($data);
        return to_route('estructuras.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estructura $estructuraBorrar)
    {
        $estructuraBorrar->delete();
    }
}

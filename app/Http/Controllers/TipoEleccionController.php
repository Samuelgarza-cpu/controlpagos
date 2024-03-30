<?php

namespace App\Http\Controllers;

use App\Models\TipoEleccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TipoEleccionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->role_id != 1) {
            return to_route('registros.index');
        }
        return Inertia::render('Tipo/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TipoEleccion $tipoEleccion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TipoEleccion $tipoEleccion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoEleccion $tipoEleccion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TipoEleccion $tipoEleccion)
    {
        //
    }
}

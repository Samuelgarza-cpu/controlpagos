<?php

namespace App\Http\Controllers;

use App\Http\Requests\Nivel\StoreRequest;
use App\Models\Nivel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NivelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->role_id != 1) {
            return to_route('registros.index');
        }
        $niveles = Nivel::all();
        return Inertia::render('Nivel/Index', compact('niveles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Nivel/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        Nivel::create($request->input());
        return to_route('niveles.index');
    }


    public function edit(Nivel $nivel)
    {
        return Inertia::render('Nivel/Edit', compact('nivel'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nivel $nivel)
    {
        $nivel->update($request->input());
        return to_route('niveles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nivel $nivel)
    {
        $nivel->delete();
        return redirect()->route('niveles.index');
    }
}

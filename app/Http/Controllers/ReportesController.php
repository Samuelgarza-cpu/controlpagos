<?php

namespace App\Http\Controllers;

use App\Models\AreaInfluencia;
use App\Models\Estructura;
use App\Models\Nivel;
use App\Models\Registros;
use App\Models\Reportes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use stdClass;

class ReportesController extends Controller
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
        $niveles = Nivel::all();
        $areas = AreaInfluencia::all();

        $selector = [
            'estructuras' => $estructuras,
            'niveles' => $niveles,
            'areas' => $areas,
        ];
        return Inertia::render('Movimientos/Index', compact('selector'));
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

        $consulta = Registros::query();

        if ($request->filled('nombre')) {
            $consulta->where('nombre', 'LIKE', '%' . $request->nombre . '%');
        }

        if ($request->filled('estructura_id')) {
            $consulta->where('estructura_id', $request->estructura_id);
        }

        if ($request->filled('nivel_id')) {
            $consulta->where('nivel_id', $request->nivel_id);
        }

        if ($request->filled('area_id')) {
            $consulta->where('area_id', $request->area_id);
        }

        $resultados = $consulta->with(['estructura', 'nivel', 'area'])->get();
        $estructuras = Estructura::all();
        $niveles = Nivel::all();
        $areas = AreaInfluencia::all();


        $totalPagar = 0;
        $totalRegistros = count($resultados);
        foreach ($resultados as $value) {
            $totalPagar = $totalPagar + $value['nivel']['importe'];
        }


        $selector = [
            'estructuras' => $estructuras,
            'niveles' => $niveles,
            'areas' => $areas,
            'resultados' => $resultados,
            'totalpagar' => $totalPagar,
            'totalRegistros' => $totalRegistros
        ];

        return Inertia::render('Movimientos/Index', compact('selector'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Reportes $reportes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reportes $reportes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reportes $reportes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reportes $reportes)
    {
        //
    }
}

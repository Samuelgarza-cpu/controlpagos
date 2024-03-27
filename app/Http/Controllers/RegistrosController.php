<?php

namespace App\Http\Controllers;

use App\Models\AreaInfluencia;
use App\Models\Estructura;
use App\Models\Nivel;
use App\Models\Registros;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegistrosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $registros = Registros::with('estructura', 'nivel', 'area')->get();
        return Inertia::render('Registros/Index', compact('registros'));
    }
    public function create()
    {
        $estructuras = Estructura::all();
        $niveles = Nivel::all();
        $areas = AreaInfluencia::all();

        $selector = [
            'estructuras' => $estructuras,
            'niveles' => $niveles,
            'areas' => $areas,
        ];

        return Inertia::render('Registros/Create', compact('selector'));
    }

    public function edit(Registros $registro)
    {
        $estructuras = Estructura::all();
        $niveles = Nivel::all();
        $areas = AreaInfluencia::all();

        $registros = Registros::find($registro->id);

        $selector = [
            'estructuras' => $estructuras,
            'niveles' => $niveles,
            'areas' => $areas,
            'registro' => $registros
        ];
        return Inertia::render('Registros/Edit', compact('selector'));
    }

    public function store(Request $request)
    {

        $request->merge([
            'nombre' => strtoupper($request->nombre),
            'tipo_eleccion' => strtoupper($request->tipo_eleccion),
            'rfc' => strtoupper($request->rfc),
            'ruta' => strtoupper($request->ruta)
        ]);

        $request->validate([
            'nombre' => 'required',
            'estructura_id' => "required",
            "area_id" => "required",
            "nivel_id" => "required",
            'tipo_eleccion' => 'required',
            'rfc' => ['required', 'regex:/^[A-Z]{4}[0-9]{6}$/', function ($attribute, $value, $fail) {
                $existeRfc = Registros::where('rfc', $value)->first();
                if ($existeRfc) $fail('Ya esta registrado este RFC');
            }],
            'telefono' => 'required|regex:/^[0-9]{10}$/',
            'ruta' => 'required'
        ]);

        $request['usuario_id'] = Auth::user()->id;
        $registro = new Registros($request->input());
        $registro->save();
        return redirect('registros');

        // $existeRfc = Registros::where('rfc', $request->rfc)->first();
        // if ($existeRfc != null) {
        //     try {
        //         throw new \Exception("¡Algo salió mal!");
        //     } catch (\Exception $e) {
        //         return response()->json(['error' => $e->getMessage()], 500);
        //     }

        //     //    /*  return "ESTE RFC YA ESTA REGISTRADO"; */
        // } else {
        //     if (strlen($request->rfc) < 10) {
        //         return "EL RFC TIENE QUE TENER MINIMO 10 CARACTERES";
        //     }
        //     $request['usuario_id'] = Auth::user()->id;
        //     $registro = new Registros($request->input());
        //     $registro->save();
        //     return redirect('registros');
        // }
    }

    public function update(Request $request, Registros $registro)
    {
        $registro->update($request->input());
        // $registros = Registros::find($id);
        // $registros->fill($request->input())->saveOrFail();
        return redirect('registros');
    }


    public function destroy(Registros $registro)
    {

        $registro->delete();
        return redirect('registros');
    }
}

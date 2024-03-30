<?php

namespace App\Http\Controllers;

use App\Models\Pagos;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function pagos(Request $request, Pagos $pagos)
    {

        $fechaActual = Carbon::now()->startOfDay();
        $array = $request->all();
        if ($request->has('undefined')) {
            return redirect()->route('movimientos.index')->with('message', 'NADA QUE APLICAR');
        } else {
            $findBeneficiaryPago = [];
            $sinRegistro = [];
            foreach ($array as $beneficiary) {
                if (is_array($beneficiary)) {
                    $findPago = Pagos::where('user_id', $beneficiary['id'])->whereDate('created_at', $fechaActual)->first();
                    if ($findPago) {
                        $findBeneficiaryPago[] = $findPago;
                    } else {
                        $sinRegistro[] = $beneficiary;
                    }
                }
            }
            $guardarPagos = [];
            $bloque = Pagos::max('bloque') + 1;
            foreach ($sinRegistro as $elemento) {
                if (is_array($elemento)) {
                    if (isset($elemento['nombre']) && isset($elemento['nivel']['importe'])) {

                        $guardarPago = [
                            'user_id' => $elemento['id'],
                            'nombre' => $elemento['nombre'],
                            'estructura' => $elemento['estructura']['nombreEstructura'],
                            'nivel' => $elemento['nivel']['nombreNivel'],
                            'area' => $elemento['area']['nameAreaI'],
                            'pago' =>  $elemento['nivel']['importe'],
                            'bloque' =>  $bloque
                        ];
                        // Agregar $guardarPago a $guardarPagos
                        // $guardarPagos[] = $guardarPago;
                        $pagos->create($guardarPago);
                    } else {
                    }
                }
            }
            if (empty($findBeneficiaryPago)) {
                return redirect()->route('movimientos.index')->with('message', 'PAGO APLICADO');
            } else {
                // return redirect()->route('movimientos.index')->with('message', 'YA HAY PAGOS');
                return  Inertia::render('Pago/Index', compact('findBeneficiaryPago'));
            }
        }
    }

    /**
     * Show the form for creating a new resource.
     */

    public function pagosagain(Request $request, Pagos $pagos)
    {

        $ultimoBloque = Pagos::max('bloque');
        foreach ($request->input() as $pago) {
            $pago['bloque'] = $ultimoBloque;
            $pagos->create($pago);
        }
        return to_route('movimientos.index');
    }
    public function create(Request $request, Pagos $pagos)
    {
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
    public function show(Pagos $pagos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pagos $pagos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pagos $pagos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pagos $pagos)
    {
        //
    }
}

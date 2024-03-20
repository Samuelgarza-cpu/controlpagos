<?php

namespace App\Http\Controllers;

use App\Models\Registros;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Registros/Index',[]);
    }

   
    public function store(Request $request)
    {
        $request->validate(['nombre'=>'required']);

        $registro = new Registros($request->input());
        $registro->save();
        return redirect('registros');
    }

    public function update(Request $request,$id)
    {
        $registros = Registros::find($id);
        $registros->fill($request->input())->saveOrFail();
        return redirect('registros');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Registros $registros)
    {
        $registros = Registros::find($id);
        $registros->delete();
        return redirect('registros');
    }
}

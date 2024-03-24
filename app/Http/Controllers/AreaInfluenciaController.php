<?php

namespace App\Http\Controllers;

use App\Http\Requests\Area\StoreRequest;
use App\Http\Requests\Area\UpdateRequest;
use App\Models\AreaInfluencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AreaInfluenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $areas = AreaInfluencia::all();
        return Inertia::render('Area/Index', compact('areas'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Area/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('nameAreaI');
        // if ($request->hasFile('avatar')) {
        //     $file = $request->file('avatar');
        //     $routeImage = $file->store('avatars', ['disk' => 'public']);
        //     $data['avatar'] = $routeImage;
        // }
        // $data['id_user'] = Auth::user()->id;
        AreaInfluencia::create($data);
        return to_route('areas.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(AreaInfluencia $areaInfluencia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AreaInfluencia $areaInfluencia)
    {

        return Inertia::render('Area/Edit', compact('areaInfluencia'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, AreaInfluencia $areaInfluencia)
    {
        $data = $request->only('nameAreaI');

        // if ($request->hasFile('avatar')) {
        //     $file = $request->file('avatar');
        //     $routeImage = $file->store('avatars', ['disk' => 'public']);
        //     $data['avatar'] = $routeImage;
        //     if ($areaInfluencia->avatar) {
        //         Storage::disk('public')->delete($areaInfluencia->avatar);
        //     }
        // }

        $areaInfluencia->update($data);
        return to_route('areas.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AreaInfluencia $areaInfluencia)
    {
        $areaInfluencia->delete();
        return to_route('areas.index');
    }
}

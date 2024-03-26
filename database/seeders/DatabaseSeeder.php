<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Estructura;
use App\Models\Nivel;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Nivel::create([
            'nombreNivel' => 'JEFE DE RUTA',
            'importe' => 1000
        ]);
        Nivel::create([
            'nombreNivel' => 'ACTIVISMO',
            'importe' => 800
        ]);
        Nivel::create([
            'nombreNivel' => 'BRIGADISTA',
            'importe' => 600
        ]);
        Nivel::create([
            'nombreNivel' => 'COORDINADOR',
            'importe' => 400
        ]);
        Estructura::create([
            'nombreEstructura' => 'CNOP',
        ]);

        Estructura::create([
            'nombreEstructura' => 'CASA MORELOS',
        ]);
        Estructura::create([
            'nombreEstructura' => 'CNC',
        ]);
        Estructura::create([
            'nombreEstructura' => 'PRI',
        ]);
    }
}

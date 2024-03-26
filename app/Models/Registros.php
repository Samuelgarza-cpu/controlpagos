<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registros extends Model
{
    protected $fillable = ['nombre', 'rfc', 'telefono', 'estructura_id', 'area_id', 'nivel_id', "tipo_eleccion", 'ruta', "usuario_id"];
    protected $hidden =  ['created_at,deleted_at'];

    public function estructura()
    {
        return $this->belongsTo(Estructura::class, 'estructura_id');
    }

    public function nivel()
    {
        return $this->belongsTo(Nivel::class, 'nivel_id');
    }
    public function area()
    {
        return $this->belongsTo(AreaInfluencia::class, 'area_id');
    }
}

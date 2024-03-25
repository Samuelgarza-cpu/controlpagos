<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoEleccion extends Model
{
    protected $fillable = ['nombreEleccion'];
    protected $hidden =  ['created_at,deleted_at'];
}

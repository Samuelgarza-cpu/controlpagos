<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagenPrueba extends Model
{
    protected $fillable = ['nombre', 'ruta', 'anime'];
    protected $hidden = ['created_at', 'updated_at'];
}

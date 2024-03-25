<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    protected $fillable = ['nombreNivel', 'importe'];
    protected $hidden =  ['created_at,deleted_at'];
}

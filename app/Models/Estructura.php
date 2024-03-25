<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estructura extends Model
{
    protected $fillable = ['nombreEstructura'];
    protected $hidden =  ['created_at,deleted_at'];
}

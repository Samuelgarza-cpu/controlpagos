<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AreaInfluencia extends Model
{
    protected $fillable = ['nameAreaI'];
    protected $hidden = ['created_at', 'updated_at'];
}

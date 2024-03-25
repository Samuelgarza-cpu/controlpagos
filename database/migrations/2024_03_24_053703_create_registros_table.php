<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registros', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->foreignId('estructura_id')->references('id')->on('estructuras');
            $table->foreignId('area_id')->references('id')->on('area_influencias');
            $table->foreignId('nivel_id')->references('id')->on('nivels');
            $table->foreignId('usuario_id')->references('id')->on('users');
            $table->string('tipo_eleccion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registros');
    }
};

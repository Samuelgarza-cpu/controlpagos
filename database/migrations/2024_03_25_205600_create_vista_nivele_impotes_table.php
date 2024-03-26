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
        DB::statement("
        CREATE 
        
    VIEW `totalpornivel` AS
        SELECT 
            `n`.`nombreNivel` AS `nombreNivel`,
            SUM(`n`.`importe`) AS `Total`
        FROM
            (`registros` `r`
            JOIN `nivels` `n` ON ((`r`.`nivel_id` = `n`.`id`)))
        GROUP BY `n`.`nombreNivel`
    ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS totalpornivel');
    }
};

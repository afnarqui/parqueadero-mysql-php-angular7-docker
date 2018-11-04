<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVehiculosParqueadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehiculos_parqueados', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('vehiculos_id')->nullable();
            $table->foreign('vehiculos_id')->references('id')->on('vehiculos');
            $table->unsignedInteger('celdas_id')->nullable();
            $table->foreign('celdas_id')->references('id')->on('celdas');
            $table->string('fecha_entrada');
            $table->string('fecha_salida');
            $table->string('estado');
            $table->string('valor')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehiculos_parqueados');
    }
}

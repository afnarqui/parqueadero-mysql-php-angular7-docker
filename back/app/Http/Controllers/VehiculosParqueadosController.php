<?php

namespace App\Http\Controllers;

use App\VehiculosParqueados;
use Illuminate\Http\Request;

class VehiculosParqueadosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehiculosparqueados = VehiculosParqueados::get();
        echo json_encode($vehiculosparqueados);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $vehiculosparqueados = new VehiculosParqueados;
        $vehiculosparqueados->vehiculos_id = $request->input('vehiculos_id');
        $vehiculosparqueados->celdas_id = $request->input('celdas_id');
        $vehiculosparqueados->fecha_entrada = $request->input('fecha_entrada');
        $vehiculosparqueados->fecha_salida = $request->input('fecha_salida');
        $vehiculosparqueados->estado = $request->input('estado');
        $vehiculosparqueados->save();
        echo json_encode($vehiculosparqueados);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\VehiculosParqueados  $vehiculosParqueados
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$vehiculosparqueados_id)
    {
        $vehiculosparqueados = VehiculosParqueados::find($vehiculosparqueados_id);
        $vehiculosparqueados->vehiculos_id = $request->input('vehiculos_id');
        $vehiculosparqueados->celdas_id = $request->input('celdas_id');
        $vehiculosparqueados->fecha_entrada = $request->input('fecha_entrada');
        $vehiculosparqueados->estado = $request->input('estado');
        $vehiculosparqueados->save();
        echo json_encode($vehiculosparqueados);
    }


}

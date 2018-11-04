<?php

namespace App\Http\Controllers;

use App\Vehiculos;
use Illuminate\Http\Request;

class VehiculosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehiculos = Vehiculos::get();
        echo json_encode($vehiculos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $vehiculos = new Vehiculos;
        $vehiculos->placa = $request->input('placa');
        $vehiculos->marca = $request->input('marca');
        $vehiculos->save();
        echo json_encode($vehiculos);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Vehiculos  $vehiculos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $vehiculo_id)
    {
        $vehiculo = Vehiculos::find($vehiculo_id);
        $vehiculo->placa = $request->input('placa');
        $vehiculo->marca = $request->input('marca');
        
        $vehiculo->save();
        echo json_encode($vehiculo);
    }
}

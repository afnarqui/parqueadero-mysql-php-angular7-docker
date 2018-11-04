<?php

namespace App\Http\Controllers;

use App\Celdas;
use Illuminate\Http\Request;

class CeldasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $celdas = Celdas::get();
        echo json_encode($celdas);
    }
}

<?php

use Illuminate\Database\Seeder;

class VehiculosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('vehiculos')->insert([
            'placa' => "YZS49C",
            'marca' => "YAMAHA YBR 125",
        ]);
        DB::table('vehiculos')->insert([
            'placa' => "A0101",
            'marca' => "MAZDA 323 AZUL",
        ]);        
    }
}

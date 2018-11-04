<?php

use Illuminate\Database\Seeder;

class CeldasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 20; $i++) {
            DB::table('celdas')->insert([
                'nombre' => "C$i",
            ]);
        }
    }
}

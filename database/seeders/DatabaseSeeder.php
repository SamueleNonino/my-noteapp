<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Note;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // Note::factory(1)->create();
        

        $user = User::factory()->create();

        Note::factory()->count(5)->create([
            'user_id' => $user->id
        ]);
    }
}

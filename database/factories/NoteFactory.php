<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'note' => fake()->sentence(3),
            'pos_x' => fake()->numberBetween(0, 100),
            'pos_y' => fake()->numberBetween(0, 100),
            'image_store' => "",
            'title' => "my title",
            'color' => fake()->hexColor(),
        ];
    }
}

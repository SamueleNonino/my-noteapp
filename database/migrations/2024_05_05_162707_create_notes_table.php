<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\NotePos;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->longText('note');
            $table->foreignId('user_id')->constrained('users');
            $table->timestamps();
            $table->float('pos_x');
            $table->float('pos_y');
            $table->string('image_store');  
            $table->string('title');  
            $table->string('color');  
            
            

            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};

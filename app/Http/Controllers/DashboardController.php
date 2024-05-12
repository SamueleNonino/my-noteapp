<?php

namespace App\Http\Controllers;
use App\Models\Note;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    // 
    
    public function index(){

        $notes = Note::query()
        ->where('user_id', request()->user()->id );
        
      

        //return Inertia::render('Dashboard');
        return Inertia::render('Note/Index', [
            'notes' => $notes
        ]);
    
    }
}

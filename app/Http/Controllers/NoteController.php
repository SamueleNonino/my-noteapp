<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\NotePos;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $notes = Note::query()
        ->where('user_id', request()->user()->id)
        ->orderBy('created_at', 'desc')->get();


    
   
        return inertia('Note/Index', [
            'notes' => $notes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia("Note/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // $data = $request->validate([
        //     'note' => ['required', 'string']
        // ]);

        $data['user_id'] = $request->user()->id;
        $data['note'] = "";
        $data['title'] = "";
        $data['pos_x'] = 0;
        $data['pos_y'] = 0;
        $data['color'] = "#aabbcc";
        


        $image=$request->file('image_store');  
        
    
        if($image){
            $image_name=time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'),$image_name);
            $data['image_store']='/'.'images'.'/'.$image_name;
        }else{
            $data['image_store']='';
        }
        
        
        $note = Note::create($data);

        return to_route('note.index')
        ->with('success', 'note was created');
    }
     /**
     * Save the picture in the storage
    */
    public function saveImage($file)
    {
        $file_name = time().'_'.'picture'.'_'.$file->getClientOriginalName();
        $file->storeAs('user/images', $file_name, 'public');
        return $file_name;
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        // if($note->user_id !== request()->user()->id)
        //     abot(403);
        // return view('note.show',['note' => $note]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        //
        if($note->user_id !== request()->user()->id)
        abot(403);
        return view('note.edit',['note' => $note]);
    }

   
    public function updateimage(Request $request, Note $note)
    {   

        

        $note = Note::query()
        ->where('user_id', request()->user()->id)
        ->where('id', $request->route()->originalParameters()['id']);


        $image=$request->file('image_store');  
        
    
        if($image){
            $image_name=time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'),$image_name);
            $data['image_store']='/'.'images'.'/'.$image_name;
        }else{
            $data['image_store']='';
        }

        $note->update($data);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {   

        if($note->user_id !== request()->user()->id)
        abot(403);

      

        $data = $request->validate([
            'note' => ['required', 'string'],
            'title' => ['required', 'string'],
            'pos_x' => ['required'],
            'pos_y' => ['required'],    
            'color' => ['required', 'string'] 
            
        ]);

      

        $note->update($data);

        //  $notes = Note::query()
        // ->where('user_id', request()->user()->id)
        // ->orderBy('created_at', 'desc')->paginate(6);

   
        // return inertia('Note/Index', [
        //     'notes' => $notes
        // ]);
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        //TODO: remove also the image associated with this note ? 

        if($note->user_id !== request()->user()->id)
        abot(403);
        $note->delete();

        return to_route('note.index')->with('message', 'Note was deleted');
    }
}

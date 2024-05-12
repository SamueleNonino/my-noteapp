
import { useState, useRef, useEffect } from "react";
import { ToolBarCard } from '@/Components/Ui/ToolBarCard';
import { router, useForm } from '@inertiajs/react';
import  { ArrowCircleDown, ArrowCircleUp } from 'iconsax-react';
import { HexColorPicker } from "react-colorful";
import chroma from "chroma-js";
import {CloseCircle} from 'iconsax-react'


export const Card = ({parentRect, noteData}) => {


    const [ShowToolBar, setShowToolBar] = useState(true);
    const [ShowColorPicker, setShowColorPicker] = useState(false);
    const ref = useRef(null);
    const textareaRef = useRef(null);
    const colorareaRef = useRef(null);
    const textareaTitleRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);
    const [height, setHeight] = useState('auto');
    const [color, setColor] = useState("#aabbcc");




    const { data, setData, delete: destroy, patch, errors, reset } = useForm({
        title: noteData.title,
        note: noteData.note,
        pos_x: noteData.pos_x,
        pos_y: noteData.pos_y,
        image_stroe: noteData.image_store
    });

    const handleAddImage = (e) => {
        console.log(e.target.files[0])
        const formData = new FormData()
        formData.append('image_store', e.target.files[0])
 
       console.log('formData', formData);
       router.post('updateimage/'+noteData.id, formData, {
        forceFormData: true,
      });
    };

    const removeImage = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('image_store', "")
 
       console.log('formData', formData);
       router.post('updateimage/'+noteData.id, formData, {
        forceFormData: true,
      });
    }

    const handleChange = (e) => {
        setData("note", e.target.value);
    };

    const handleChangeTitle = (e) => {
        console.log("e");
        setData("title", e.target.value);
    };
    

    const handleOnClick = (e) => {
        e.preventDefault();
        setShowToolBar(!ShowToolBar);
        if(ShowColorPicker){
            setShowColorPicker(false);
        }
    }
    const handleClose = (e) => {
        setShowToolBar(false);
    }

    const handleDelete = (e) => {
        e.preventDefault();    
        router.delete(route('note.destroy', noteData.id), {preserveScroll: true})
    }

    const handleSave = (e) => {
        e.preventDefault();
        patch(route(`note.update`, noteData.id));
    }

    const handleShowColorPicker = (e) => {
        e.preventDefault();
        setShowColorPicker(!ShowColorPicker);
    }

    function isDark(color) {
        const luminance = chroma(color).luminance();
        return luminance <= 0.5;
    }

    const positionNote = () => {
        if(data.pos_x && data.pos_y && parentRect){
     
            const parentWidth = parentRect.right - parentRect.left;
            const parentHeight = parentRect.bottom - parentRect.top;

            const componentWidth = ref.current.offsetWidth;
            const componentHeight = ref.current.offsetHeight;

            const offsetLeft = (data.pos_x * (parentWidth - componentWidth)) / 100 + parentRect.left;
            const offsetTop = ((data.pos_y / 100) * (parentHeight - componentHeight)) + parentRect.top;
    
            ref.current.style.left = `${offsetLeft}px`;
            ref.current.style.top = `${offsetTop}px`;                 
        }
    };

    useEffect(()=> {
        positionNote();
    },[noteData, parentRect])

    useEffect(() => {
        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const handleMouseMove = (e) => {
            if(ref.current){
                if (isDragging) {
                    const parentLeft = parentRect.left;
                    const parentTop = parentRect.top;
                    const parentRight = parentRect.right;
                    const parentBottom = parentRect.bottom;
    
                    const noteWidth = ref.current.offsetWidth;
                    const noteHeight = ref.current.offsetHeight;
    
                    let x = e.clientX - dx;
                    let y = e.clientY - dy;
    
                    if (x < parentLeft) {
                        x = parentLeft;
                    } else if (x + noteWidth > parentRight) {
                        x = parentRight - noteWidth;
                    }
    
                    if (y < parentTop) {
                        y = parentTop;
                    } else if (y + noteHeight > parentBottom) {
                        y = parentBottom - noteHeight;
                    }
    
                    ref.current.style.left = x + "px";
                    ref.current.style.top = y + "px";
    
    
                     /// Calcola la posizione percentuale rispetto al genitore
                    const parentWidth = parentRect.right - parentRect.left;
                    const parentHeight = parentRect.bottom - parentRect.top;
                   
                    //dimensioni attuali del componente
                    const componentWidth = ref.current.offsetWidth;
                    const componentHeight = ref.current.offsetHeight;

                    //posizione in perecnutale rispetto al parent
                    const x_percentage = ((ref.current.offsetLeft - parentRect.left) / (parentWidth - componentWidth)) * 100;
                    const y_percentage = ((ref.current.offsetTop - parentRect.top) / (parentHeight - componentHeight)) * 100;
            

                    const newData = {
                        note: data.note,
                        pos_x: x_percentage,
                        pos_y: y_percentage,
                    }
            
                    setData({ ...data, ...newData });
                
                }
            }
        };

        const handleMouseDown = (e) => {
            let bRes = ShowColorPicker == false ? true : 
                colorareaRef.current ? !colorareaRef.current.contains(e.target) : true
            if (!textareaRef.current.contains(e.target) && !textareaTitleRef.current.contains(e.target) && bRes) {
                e.preventDefault();
                setIsDragging(true);
                const boundingRect = ref.current.getBoundingClientRect();
                setDx(e.clientX - boundingRect.x);
                setDy(e.clientY - boundingRect.y);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        ref.current.addEventListener("mousedown", handleMouseDown);

        return () => {
            if(ref.current){
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
                ref.current.removeEventListener("mousedown", handleMouseDown);   
              
            }
        };
    }, [isDragging, dx, dy, parentRect, noteData]);


    console.log("noteData: " + noteData.image_store);
    
    return (
        
        <div ref={ref}
        style={{ cursor: 'pointer',
            position:'fixed',
            maxWidth: '400px',
            maxHeight: '400px'
        }}>
    

        {/* <div className="rounded ">

        <textarea
                    
        ></textarea>

        </div> */}

        {/* <div style={{backgroundColor: color, backgroundImage: 
            noteData.image_store ? 
            `url(${noteData.image_store})` : '',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }} */}
        <div
        style={{backgroundColor: color}}
        className="w-58 flex flex-col gap-1 justify-between  rounded-lg border border-gray-400 mb-1 py-3 px-3">
            <button className="w-6" onClick={handleOnClick}> {ShowToolBar ? <ArrowCircleDown color="#dae3db"></ArrowCircleDown> : <ArrowCircleUp color="#dae3db"></ArrowCircleUp>} </button>
            
            {ShowToolBar && <ToolBarCard  handleAddImage={handleAddImage} handleShowColorPicker={handleShowColorPicker} handleSave={handleSave} handleClose={handleClose} handleDelete={handleDelete}></ToolBarCard> }
           
            <div className="flex flex-col justify-center center h-full">
                <div>
                    <textarea
                        style={{color: isDark(color) ? 'white' : 'black'}}
                        value={data.title}
                        ref={textareaTitleRef}
                        onChange={handleChangeTitle}
                        placeholder="Title"
                        className="bg-transparent block w-full text-sm border border-gray-300 rounded-md row-1 text-gray-800 dark:text-gray-100  resize-none border-none border-transparent focus:border-transparent focus:ring-0 h-8" // Modifica la classe h-8 per ridurre l'altezza
                    ></textarea>
                </div>
                <div>
                    <textarea
                        style={{color: isDark(color) ? 'white' : 'black'}}
                        value={data.note}
                        ref={textareaRef}
                        onChange={handleChange}
                        placeholder="yo"
                        className="bg-transparent text-gray-800 dark:text-gray-100 text-s w-full h-full resize-none border-none border-transparent focus:border-transparent focus:ring-0"
                    ></textarea>
                </div>
                <div>

                    {noteData.image_store &&    <div className="relative">
                            <div className="flex justify-end">
                                <button onClick={removeImage} className="absolute top-0 right-0 p-2"><CloseCircle /></button>
                            </div>
                            <div className="flex items-center justify-center">
                                <img className="max-w-full max-h-full w-auto h-auto" src={noteData.image_store} alt="Descrizione dell'immagine" />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        {   
            
            ShowColorPicker &&  <div  ref={colorareaRef}><HexColorPicker  color={color} onChange={setColor} /></div>
        }
        </div> 
       
       
    );
};




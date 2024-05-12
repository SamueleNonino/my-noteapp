import { useState, useRef, useEffect } from "react";
import DangerButton from "../DangerButton";
import PrimaryButton from "../PrimaryButton";
import { router, useForm } from '@inertiajs/react'

function Note({ parentRect, noteData, offsetTop }) {

    //console.log(offsetTop);

    const ref = useRef(null);
    const textareaRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);
   
    const { data, setData, delete: destroy, patch, errors, reset } = useForm({
        note: noteData.note,
        pos: noteData.pos,
        _method: "PUT",
    });
    
    const handleDelete = (e) => {
        e.preventDefault();
        console.log("Delete Note", noteData);
        router.delete(route('note.destroy', noteData.id), {preserveScroll: true})
    }

    const handleSave = (e) => {
        e.preventDefault();
        patch(route(`note.update`, noteData.id));
    }

    const positionNote = () => {
        if(data.pos && parentRect && offsetTop){

           let pos = JSON.parse(data.pos);

          // console.log(parentRect);

            const parentWidth = parentRect.right - parentRect.left;
            const parentHeight = parentRect.bottom - parentRect.top;

            // Parse delle coordinate percentuali da data.pos
            const x_percentage = parseFloat(((pos.x)));
            const y_percentage = parseFloat(((pos.y)));
                      
            console.log("x", x_percentage, "y", y_percentage);
           // Calcolo delle coordinate in pixel rispetto al parent considerando anche gli spazi dei componenti circostanti
            const parentLeft = parentRect.left + 0 // Posizione assoluta del genitore rispetto al documento
            const parentTop = parentRect.top ; // Posizione assoluta del genitore rispetto al documento
            console.log("offsetTop", offsetTop);

            const x = parentLeft + (parentWidth * x_percentage) / 100;
            const y = parentTop + (parentHeight * y_percentage) / 100;

            
          //  console.log("x", x, "y", y);

            ref.current.style.left = x + 'px';
            ref.current.style.top = y + 'px';

        

            // const noteWidth = ref.current.offsetWidth;
            // const noteHeight = ref.current.offsetHeight;
            // const parentWidth = parentRect.right - parentRect.left;
            // const parentHeight = parentRect.bottom - parentRect.top;
            // let x = 0;
            // let y = 0;
            // const margin = 50;

            // switch (data.pos) {
            //     case 'Center':
            //         x = parentRect.left + (parentWidth - noteWidth) / 2;
            //         y = parentRect.top + (parentHeight - noteHeight) / 2;
            //         break;
            //     case 'Left':
            //         x = parentRect.left  + margin;
            //         y = parentRect.top + (parentHeight - noteHeight) / 2;
            //         break;
            //     case 'Right':
            //         x = parentRect.right - noteWidth - margin;
            //         y = parentRect.top + (parentHeight - noteHeight) / 2;
            //         break;
            //     case 'Up':
            //         x = parentRect.left + (parentWidth - noteWidth) / 2;
            //         y = parentRect.top + margin;
            //         break;
            //     case 'Down':
            //         x = parentRect.left + (parentWidth - noteWidth) / 2;
            //         y = parentRect.bottom - noteHeight + margin;
            //         break;
            //     default:
            //         break;
            // }

            // ref.current.style.left = x + 'px';
            // ref.current.style.top = y + 'px';
      
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
                    const x_percentage = ((ref.current.getBoundingClientRect().left - parentRect.left) / parentWidth) * 100;
                    const y_percentage = ((ref.current.getBoundingClientRect().top - parentRect.top) / parentHeight) * 100;
                    
                   // console.log(x_percentage, y_percentage);
    
                    setData('pos', JSON.stringify({x: x_percentage, y: y_percentage}));
    
                }
            }
         
        };

        const handleMouseDown = (e) => {
            if (!textareaRef.current.contains(e.target)) {
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

        /*Mobile*/

        document.addEventListener("touchemove", handleMouseMove);
        document.addEventListener("touchend", handleMouseUp);
        ref.current.addEventListener("touchstart", handleMouseDown);


        return () => {
            if(ref.current){
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
                ref.current.removeEventListener("mousedown", handleMouseDown);   
                            
                /*Mobile*/  

                document.removeEventListener("touchemove", handleMouseMove);
                document.removeEventListener("touchend", handleMouseUp);
                ref.current.removeEventListener("touchstart", handleMouseDown);
        
        
            }
        };
    }, [isDragging, dx, dy, parentRect, noteData]);


    
    return (
        <div className="card" ref={ref}>
            <div className="card-head">
                my note {noteData.id}
            </div>
            <div className="card-body">
                <textarea ref={textareaRef}  
                value={data.note} // ...force the input's value to match the state variable...
                onChange={e => setData("note", e.target.value)} // ... and update the state variable on any edits!
                >

                </textarea>
            </div>
            <div className="card-footer">
                <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
                <DangerButton  onClick={handleDelete}>Delete</DangerButton>
            </div>
        </div>
    );
}

export default Note;

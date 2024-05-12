import { useEffect, useRef, useState } from "react";
// import Note from "./Note";
import Draggable from "react-draggable";
import PrimaryButton from "../PrimaryButton";
import { router, useForm } from '@inertiajs/react' 

function NotesContainer({data}) {



    const ref = useRef(null);
    const [parentRect, setParentRect] = useState(null);
    const [OffsetTop, setOffsetTop] = useState(0);

    const handleResize = () => {
        if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setOffsetTop(ref.current.offsetTop);
        setParentRect(rect);
        }
    };
    
    // Aggiorna le dimensioni del genitore quando la
    // finestra viene ridimensionata o il componente viene montato
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const handleAddNote = (e) => {
        e.preventDefault();
    //    post(route("note.store"));
    }


    return (  <></>
        // <div>
        //     <div style={{display:'flex',  justifyContent:'center', gap:'10px'}}>
        //         <div>
        //             Add Note
        //         </div>
        //         <div>
        //             <PrimaryButton onClick={handleAddNote}>+</PrimaryButton>
        //         </div>
        //     </div>
        //     <div className="app" ref={ref}>
        //         {
        //             data.map( (i,k) => {
        //                 return <Note parentRect={parentRect} noteData={i} offsetTop={OffsetTop}  key={k} ></Note>
        //             })
        //         }
        //     </div>
        // </div>
    );
}

export default NotesContainer;
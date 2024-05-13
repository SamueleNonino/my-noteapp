
import React from 'react';
import { Image } from 'iconsax-react';
import { ElementPlus } from 'iconsax-react';
import { ColorSwatch } from 'iconsax-react';
import { Save2  } from 'iconsax-react';
import { NoteRemove  } from 'iconsax-react';
import { CloseCircle  } from 'iconsax-react';
import { useRef } from 'react';
import Tooltip from '@/Components/Ui/Tooltip'



export const ToolBarCard = ({handleClose, handleSave, handleDelete, handleShowColorPicker, handleAddImage}) => {
    const ref = useRef(null);

    return ( 
        <div className="shadow-[1px_1px_10px_0px_rgba(0,0,0,0.10)] rounded-2xl px-6
        py-4 flex gap-6 items-center justify-center relative bg-white ">

            <div className="relative w-6 h-6 bg-transparent bg-white"> 
            <Tooltip message={"ad an image"}>
            <button onClick={(e) => {
                e.preventDefault();
                console.log("button onClick")
                ref.current.click();
            }}>
             <Image />  
            </button>
            </Tooltip>
            <input  ref={ref} accept="image/*"
                onChange={(e) => handleAddImage(e)}
                type="file" style={{ display: 'none' }} />
                
            </div>
            <div className="relative w-6 h-6 bg-transparent bg-white"> 
                <Tooltip message={"change my color"}>
                    <button onClick={handleShowColorPicker}>
                        <ColorSwatch />
                    </button>
                </Tooltip>
            </div>
            <div className="relative w-6 h-6 bg-transparent bg-white "> 
                <Tooltip message={"save me"}>
                    <button style={{cursor:'pointer'}} onTouchStart={(e) => handleSave} onClick={handleSave}>  
                        <Save2 /> 
                    </button>
                </Tooltip>
            </div>
            <div className="relative w-6 h-6 bg-transparent bg-white"> 
                <Tooltip message={"delete me"}><button onClick={handleDelete}> <NoteRemove /> </button></Tooltip> </div>
            <div className="relative w-6 h-6 bg-transparent bg-white"> 
                <Tooltip message={"close me"}><button onClick={handleClose}><CloseCircle /></button></Tooltip> </div>

        </div>
    
    );
};


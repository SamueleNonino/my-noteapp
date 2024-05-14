import { useEffect, useRef, useState } from "react";
import { Card } from "@/Components/Ui/Card";
import { FooterMenu } from "@/Components/Ui/FooterMenu";
import { router, useForm } from '@inertiajs/react'
import Dropzone from "react-dropzone";

function Index({ auth, notes }) {

    const ref = useRef(null);
    const [parentRect, setParentRect] = useState(null);

    const handleResize = () => {

        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setParentRect(rect);
        }
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        //    post(route("note.store"));
    }

    const { data, setData, post, processing, errors } = useForm({
        note: '',
        x: 0,
        y: 0,
        image_store: '',
    });

    // Aggiorna le dimensioni del genitore quando la
    // finestra viene ridimensionata o il componente viene montato
    useEffect(() => {

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>

            <div className="h-screen w-screen flex flex-col justify-between bg-gray-200 " ref={ref}>

                <div className="flex w-screen h-full border-cyan-700">
                    <Dropzone noClick={true}
                        maxFiles={1}
                        acceptedFiles='.png,.jpg'
                        maxSize={2000000}
                        onDrop={(acceptedFiles) => {
                        }}
                        onError={(e) => {
                            console.log('error', e);
                        }}
                        onDropAccepted={(e) => {
                            console.log('drop accepted', e);
                            const formData = new FormData()
                            formData.append('image_store', e[0])

                            console.log('formData', formData);
                            router.post('note', formData, {
                                forceFormData: true,
                                onError: errors => { alert(errors) },
                            });

                            //    setData(
                            //     'image_store',
                            //     e[0]
                            //     ); 
                        }}
                        onDropRejected={() => {
                            alert('File too big');
                        }}

                    >
                        {({
                            getRootProps,
                            getInputProps,
                        }) => (
                            <div className="w-screen  flex items-center justify-center">
                                <div {...getRootProps()} className="w-full h-full  rounded-lg flex items-center justify-center">
                                    {/* <input {...getInputProps()} /> */}

                                    {notes.map((i, k) => {
                                        return (<Card
                                            parentRect={parentRect}
                                            noteData={i}
                                            key={i.id}>
                                        </Card>)
                                    })}
                                </div>
                            </div>
                        )}
                    </Dropzone>




                </div>

                <div className="p-4 text-center">
                    <div className="flex flex-col items-center justify-center">
                        <div><p className="text-gray-500 px-4 py-4">Drag an image to create a note</p></div>
                        <FooterMenu auth={auth} ></FooterMenu>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default Index;
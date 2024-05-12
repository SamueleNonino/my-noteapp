
import React from 'react';
import { Profile, Save2 } from 'iconsax-react';
import { NoteAdd } from 'iconsax-react';
import { Logout } from 'iconsax-react';

import { Head, Link, useForm } from "@inertiajs/react";



export const FooterMenu = ({auth}) => {

    const { data, setData, post, get, errors, reset } = useForm({
        note: "testo",
        x: 0,
        y: 0,
    });

    const hanldeOnClickAdd = (e) => {
        e.preventDefault();
        post(route("note.store"));
    };

    const hanldeOnClickLogOut = (e) => {
        e.preventDefault();
        get(route("profile.logout"));
    };

    const hanldeOnClickProfileEdit = (e) => {
        e.preventDefault();
        get(route("profile.edit"));
    };



    return ( 
            <div className="shadow-[1px_1px_10px_0px_rgba(0,0,0,0.10)] rounded-2xl px-6
            py-4 flex gap-6 items-start relative bg-white mb-4">
            <div className="relative w-6 h-6 bg-transparent bg-white" > <button onClick={hanldeOnClickProfileEdit}> <Profile/></button></div>
            <div className="relative w-6 h-6 bg-transparent bg-white"> <button onClick={hanldeOnClickAdd}> <NoteAdd/></button></div>
            <div className="relative w-6 h-6 bg-transparent bg-white"> <button onClick={hanldeOnClickLogOut}> <Logout/></button></div>
        </div>
    );
};


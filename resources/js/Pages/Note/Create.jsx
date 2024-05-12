
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

function Create({auth}) {

    const { data, setData, post, errors, reset } = useForm({
    note: "testo",
    x: 0,
    y: 0,
    
    });

    const hanldeOnClick = (e) => {
        e.preventDefault();
        post(route("note.store"));
    };


    return ( 
    <>
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new Note
          </h2>
        </div>
      }
    >
      <button onClick={hanldeOnClick}>
      +
      </button>
    </AuthenticatedLayout>
    </>
    );
}

export default Create;
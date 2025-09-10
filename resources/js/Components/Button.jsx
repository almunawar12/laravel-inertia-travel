import { Link, useForm } from "@inertiajs/react";
import {
    IconArrowBack,
    IconCheck,
    IconPencil,
    IconPlus,
} from "@tabler/icons-react";
import React from "react";
import Swal from "sweetalert2";

export default function Button() {
    const { delete: destroy } = useForm();

    const handleDeleteData = async (url) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(url);

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };
    return (
        <>
            {type === "add" && (
                <Link
                    href={url}
                    className="px-4 py-2 text-sm border rounded-lg bg-white text-gray-700 flex items-center gap-2 hover:bg-gray-100"
                >
                    <IconPlus size={18} strokeWidth={1.5} />{" "}
                    <span className="hidden lg:flex">Create New data</span>
                </Link>
            )}

            {type === "modal" && (
                <button
                    {...props}
                    type="button"
                    className={`${className} px-4 py-2 text-sm border rounded-lg flex items-center gap-2`}
                >
                    {children}
                </button>
            )}

            {type === "submit" && (
                <button
                    type="submit"
                    className="px-4 py-2 text-sm rounded-lg border border-teal-100 bg-teal-50 text-teal-500 flex items-center gap-2 hover:bg-teal-100"
                >
                    <IconCheck size={16} strokeWidth={1.5} />
                    Save Data
                </button>
            )}
            {type === "cancel" && (
                <Link
                    href={url}
                    className="px-4 py-2 text-sm rounded-lg border border-rose-100 bg-rose-50 text-rose-500 flex items-center gap-2 hover:bg-rose-100"
                >
                    <IconArrowBack size={16} strokeWidth={1.5} /> Go back
                </Link>
            )}
            {type === "delete" && (
                <Link
                    onClick={() => handleDeleteData(url)}
                    className="px-4 py-2 text-sm rounded-lg border border-rose-100 bg-rose-50 text-rose-500 flex items-center gap-2 hover:bg-rose-100"
                >
                    <IconTrash size={16} strokeWidth={1.5} /> Delete
                </Link>
            )}
            {type === "edit" && (
                <Link
                    href={url}
                    className="px-4 py-2 rounded-lg bg-orange-50 text-orange-500 flex items-center gap-2 hover:bg-orange-100"
                >
                    <IconPencil size={16} strokeWidth={1.5} /> Edit
                </Link>
            )}
        </>
    );
}

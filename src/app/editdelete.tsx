'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { deleteUser, updateUser } from "./lib/action";

interface UserProps {
    id: number;
    setisfetching: Dispatch<SetStateAction<boolean>>;
}
export default function EditAndDelete({ id, setisfetching }: UserProps) {
    const [firstName, setfirstName] = useState<string>('')
    const [lastName, setlastName] = useState<string>('')
    const [email, setemail] = useState<string>('')
    const [isEdit, setisEdit] = useState<number | undefined>(undefined)


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!firstName || !lastName || !email) {
            alert('fill all fields')
            return
        }
        const update = await updateUser({ firstName, lastName, email, id });
        if (update.success === true) {
            setisfetching(true)
        }
        setisEdit(undefined);
    };

    const handleDelete = async (id: number) => {
        const deleted = await deleteUser(id)
        if (deleted.success === true) {
            setisfetching(true)
        }
    }
    return (
        <div>
            {isEdit === id && <form className="space-y-4 p-4" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold text-blue-500 text-center">Add User</h1>
                <input onChange={(e) => setfirstName(e.target.value)} className="w-full border-2 p-4" placeholder="First Name" name="firstName" type="text" />
                <input onChange={(e) => setlastName(e.target.value)} className="w-full border-2 p-4" placeholder="Last Name" name="lastName" type="text" />
                <input onChange={(e) => setemail(e.target.value)} className="w-full border-2 p-4" placeholder="Email" name="email" type="text" />
                <button type="submit" className="bg-blue-500 text-white rounded-lg px-8 py-4">Submit</button>
            </form>}
            <div className="flex flex-wrap justify-center gap-8">
                <button onClick={() => setisEdit(id)} className="bg-green-400 text-white px-8 py-2 w-full md:w-auto">Edit</button>
                <button onClick={() => { handleDelete(id) }} className="bg-gray-500 text-white px-8 py-2 w-full md:w-auto">Delete</button>
            </div>
        </div>
    )
}
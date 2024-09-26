'use client'

import { useState } from "react";
import { deleteUser, updateUser } from "./lib/action";

interface UserProps {
    id: number;
}
export default function EditAndDelete({ id }: UserProps) {
    const [isEdit, setisEdit] = useState<number | undefined>(undefined)


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.currentTarget); // Get form data
        await updateUser(formData); // Call your updateUser function
        setisEdit(undefined); // Close the edit form after submission
    };
    return (
        <div>
            {isEdit === id && <form className="space-y-4 p-4" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold text-blue-500 text-center">Add User</h1>
                <input className="w-full border-2 p-4" placeholder="First Name" name="firstName" type="text" />
                <input className="w-full border-2 p-4" placeholder="Last Name" name="lastName" type="text" />
                <input className="w-full border-2 p-4" placeholder="Email" name="email" type="text" />
                <input className="w-full border-2 p-4" name='id' value={id} hidden />
                <button type="submit" className="bg-blue-500 text-white rounded-lg px-8 py-4">Submit</button>
            </form>}
            <div className="flex justify-center gap-8">
                <button onClick={() => setisEdit(id)} className="bg-green-400 text-white px-8 py-2">Edit</button>
                <button onClick={() => deleteUser(id)} className="bg-gray-500 text-white px-8 py-2">Delete</button>
            </div>
        </div>
    )
}
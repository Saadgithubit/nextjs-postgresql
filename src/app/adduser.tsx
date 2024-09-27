'use client'

import React, { useState } from 'react';
import { addUser } from "./lib/action";

export default function UserAdd() {
    const [firstName, setfirstName] = useState<string>('')
    const [lastName, setlastName] = useState<string>('')
    const [email, setemail] = useState<string>('')

    const handeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!firstName || !lastName || !email) {
            alert('fill all fields')
            return
        }
        await addUser({ firstName, lastName, email });
    }
    return (
        <form onSubmit={handeSubmit} className="w-1/3 space-y-4 border-2 p-4">
            <h1 className="text-2xl font-semibold text-blue-500 text-center">Add User</h1>
            <input onChange={(e) => setfirstName(e.target.value)} className="w-full border-2 p-4" placeholder="First Name" name="firstName" type="text" />
            <input onChange={(e) => setlastName(e.target.value)} className="w-full border-2 p-4" placeholder="Last Name" name="lastName" type="text" />
            <input onChange={(e) => setemail(e.target.value)} className="w-full border-2 p-4" placeholder="Email" name="email" type="text" />
            <button type='submit' className="bg-blue-500 text-white rounded-lg px-8 py-4">Add User</button>
        </form>
    )
}
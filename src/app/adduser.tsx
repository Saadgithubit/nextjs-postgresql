'use client'

import React, { useState } from 'react';
import Swal from 'sweetalert2'
import Image from 'next/image';

import { addUser } from "./lib/action";
import EditAndDelete from './editdelete';
import loading from '@/image/loading.gif'

export interface Display {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
}

export interface UserProps {
    allUsers: Display[]
}

export default function UserAdd({ allUsers }: UserProps) {
    const [userData, setUserData] = useState<Display[]>(allUsers)
    const [firstName, setfirstName] = useState<string>('')
    const [lastName, setlastName] = useState<string>('')
    const [email, setemail] = useState<string>('')

    const handeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!firstName || !lastName || !email) {
            alert('fill all fields')
            return
        }
        const add = await addUser({ firstName, lastName, email });
        if (add.success === true) {
            Swal.fire({
                title: "Good job!",
                text: add.message,
                icon: "success"
            });
            setUserData(add.users ?? [])
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: add.message,
            });
        }
    }
    return (
        <div>
            {userData.length > 0 ? <div className='px-4 lg:px-0'>
                <div className="flex justify-center items-start py-4 gap-6">
                    <form onSubmit={handeSubmit} className="w-full lg:w-1/3 space-y-4 border-2 p-4">
                        <h1 className="text-2xl font-semibold text-blue-500 text-center">Add User</h1>
                        <input onChange={(e) => setfirstName(e.target.value)} className="w-full border-2 p-4" placeholder="First Name" name="firstName" type="text" />
                        <input onChange={(e) => setlastName(e.target.value)} className="w-full border-2 p-4" placeholder="Last Name" name="lastName" type="text" />
                        <input onChange={(e) => setemail(e.target.value)} className="w-full border-2 p-4" placeholder="Email" name="email" type="text" />
                        <button type='submit' className="bg-blue-500 text-white rounded-lg px-8 py-4">Add User</button>
                    </form>
                </div>
                <div className='flex flex-wrap gap-4 justify-center'>
                    {userData.map((item) => {
                        const { id, firstName, lastName, email, createdAt } = item
                        const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        });
                        return (
                            <div key={id} className="border-2 w-full lg:w-[25%] py-4 mb-4 lg:mb-0">
                                <div className="flex gap-4 p-3">
                                    <h1 className='font-semibold'>Id:</h1>
                                    <span>{id}</span>
                                </div>
                                <div className="flex gap-4 p-3">
                                    <h1 className='font-semibold'>FullName:</h1>
                                    <span>{`${firstName} ${lastName}`}</span>
                                </div>
                                <div className="flex gap-4 p-3">
                                    <h1 className='font-semibold'>Email:</h1>
                                    <span>{email}</span>
                                </div>
                                <div className="flex gap-4 p-3">
                                    <h1 className='font-semibold'>Register Date:</h1>
                                    <span>{formattedDate}</span>
                                </div>
                                <EditAndDelete id={id} setUserData={setUserData} />
                            </div>
                        )
                    })}
                </div>
            </div> :
                <Image className='w-[50%] md:w-auto mx-auto mt-16' src={loading} alt='loader' />}
        </div>

    )
}
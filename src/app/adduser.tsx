'use client'

import React, { useState } from 'react';
import Image from 'next/image';

import { addUser } from "./lib/action";
import EditAndDelete from './editdelete';
import loader from '@/image/loading.gif'
import { Alert, Backdrop, CircularProgress, Snackbar, SnackbarCloseReason } from '@mui/material';

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
    const [successAlert, setSuccessAlert] = useState(false);
    const [failedAlert, setfailedAlert] = useState(false);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccessAlert(false);
    };

    const handeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        if (!firstName || !lastName || !email) {
            alert('fill all fields')
            return
        }
        const add = await addUser({ firstName, lastName, email });
        if (add.success === true) {
            setfirstName('')
            setlastName('')
            setemail('')
            setLoading(false)
            setMessage(add.message)
            setSuccessAlert(true)
            setUserData(add.users ?? [])
        } else {
            setLoading(false)
            setMessage(add.message)
            setfailedAlert(true)
        }
    }
    return (
        <div>
            {userData.length > 0 ? <div className='px-4 lg:px-0'>
                <div className="flex justify-center items-start py-4 gap-6">
                    <form onSubmit={handeSubmit} className="w-full lg:w-1/3 space-y-4 border-2 p-4">
                        <h1 className="text-2xl font-semibold text-blue-500 text-center">Add User</h1>
                        <input value={firstName} onChange={(e) => setfirstName(e.target.value)} className="w-full border-2 p-4" placeholder="First Name" type="text" />
                        <input value={lastName} onChange={(e) => setlastName(e.target.value)} className="w-full border-2 p-4" placeholder="Last Name" type="text" />
                        <input value={email} onChange={(e) => setemail(e.target.value)} className="w-full border-2 p-4" placeholder="Email" type="text" />
                        <button type='submit' className="bg-blue-500 text-white rounded-lg px-8 py-4">Add User</button>
                    </form>
                    <Snackbar open={successAlert} autoHideDuration={4000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={failedAlert} autoHideDuration={4000} onClose={handleClose}>
                        <Alert severity="error">This is an error Alert.</Alert>
                    </Snackbar>
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={loading}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
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
                <div className='h-screen flex justify-center items-center'>
                    <CircularProgress className='mx-auto' />
                </div>}
        </div>

    )
}
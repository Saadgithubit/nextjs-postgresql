'use client'

import React, { useState } from 'react';

import { addUser } from "../../lib/action";
import { Alert, Backdrop, CircularProgress, Snackbar, SnackbarCloseReason } from '@mui/material';
import EditAndDelete from '../editdeleteuser/editdelete';

export interface Display {
    id: number;
    username: string;
    email: string;
    createdAt: string;
}

export interface UserProps {
    allUsers: Display[]
}

export default function UserAdd({ allUsers }: UserProps) {
    const [userData, setUserData] = useState<Display[]>(allUsers)
    const [userName, setuserName] = useState<string>('')
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
        if (!userName || !email) {
            alert('fill all fields')
            return
        }
        const add = await addUser({ userName, email });
        if (add.success === true) {
            setuserName('')
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
        <div className='border-2'>
            <h1 className='text-center text-4xl font-bold py-8'>Next + Posgress CRUD Operation</h1>
            {userData.length > 0 ? <div className='px-4 lg:px-0'>
                <div className="flex justify-center items-start py-4 gap-6">
                    <form onSubmit={handeSubmit} className="w-full lg:w-1/3 space-y-4 border-2 p-4 bg-[#ebeef2] rounded-xl">
                        <h1 className="text-2xl font-semibold text-blue-500 text-center">Add User</h1>
                        <input value={userName} onChange={(e) => setuserName(e.target.value)} className="w-full border-2 p-4" placeholder="Username" type="text" />
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
                        const { id, username, email, createdAt } = item
                        const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        });
                        return (
                            <div key={id} className="border-2 w-full lg:w-[25%] py-4 mb-4 lg:mb-0 bg-[#ebeef2] rounded-xl">
                                <div className="flex gap-4 p-3">
                                    <h1 className='font-semibold'>Id:</h1>
                                    <span>{id}</span>
                                </div>
                                <div className="flex gap-4 p-3">
                                    <h1 className='font-semibold'>UserName:</h1>
                                    <span>{username}</span>
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
'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { deleteUser, updateUser } from "./lib/action";
import { Display } from "./adduser";
import { Alert, Backdrop, Box, Button, CircularProgress, Modal, Snackbar, SnackbarCloseReason, Tooltip, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface UserProps {
    id: number;
    setUserData: Dispatch<SetStateAction<Display[]>>;
}
export default function EditAndDelete({ id, setUserData }: UserProps) {
    const [firstName, setfirstName] = useState<string>('')
    const [lastName, setlastName] = useState<string>('')
    const [email, setemail] = useState<string>('')
    const [isEdit, setisEdit] = useState<number | undefined>(undefined)
    const [successAlert, setSuccessAlert] = useState(false);
    const [failedAlert, setfailedAlert] = useState(false);
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccessAlert(false);
    };



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)
        if (!firstName || !lastName || !email) {
            alert('fill all fields')
            return
        }
        const update = await updateUser({ firstName, lastName, email, id });
        if (update.success === true) {
            setLoading(false)
            setMessage(update.message)
            setSuccessAlert(true)
            setUserData(update.users ?? [])
        } else {
            setLoading(false)
            setMessage(update.message)
            setfailedAlert(true)
        }
        setisEdit(undefined);
    };

    const handleDelete = async (id: number) => {
        setOpen(false)
        setLoading(true)
        const deleted = await deleteUser(id)
        if (deleted.success === true) {
            setLoading(false)
            setMessage(deleted.message)
            setSuccessAlert(true)
            setUserData(deleted.users ?? [])
        } else {
            setLoading(false)
            setMessage(deleted.message)
            setfailedAlert(true)
        }
    }
    return (
        <div>
            {isEdit === id && <form className="space-y-4 p-4 relative border-t-2 border-b-2" onSubmit={handleSubmit}>
                <div onClick={() => setisEdit(undefined)} className="absolute top-6 right-4">
                    <Tooltip title="Close" arrow>
                        <CloseIcon />
                    </Tooltip>
                </div>
                <h1 className="text-2xl font-semibold text-blue-500 text-center">Edit User</h1>
                <input onChange={(e) => setfirstName(e.target.value)} className="w-full border-2 p-4" placeholder="First Name" name="firstName" type="text" />
                <input onChange={(e) => setlastName(e.target.value)} className="w-full border-2 p-4" placeholder="Last Name" name="lastName" type="text" />
                <input onChange={(e) => setemail(e.target.value)} className="w-full border-2 p-4" placeholder="Email" name="email" type="text" />
                <button type="submit" className="bg-blue-500 text-white rounded-lg px-8 py-4">Submit</button>
            </form>}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 px-4 md:px-0 py-2">
                <button onClick={() => setisEdit(id)} className="bg-green-400 text-white px-8 py-2 w-full md:w-auto">Edit</button>
                <button onClick={() => setOpen(true)} className="bg-gray-500 text-white px-8 py-2 w-full md:w-auto">Delete</button>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography className="text-red-500 font-semibold" id="modal-modal-title" variant="h6" component="h2">
                            Are You Sure
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                            You Want To Delete This User???
                        </Typography>
                        <div className="py-2">
                            <Button onClick={() => setOpen(false)} className="text-xl" sx={{ textTransform: 'none' }}>No</Button>
                            <Button onClick={() => handleDelete(id)} className="text-xl" sx={{ textTransform: 'none' }}>Yes</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
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
                <Alert severity="error">{message}</Alert>
            </Snackbar>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
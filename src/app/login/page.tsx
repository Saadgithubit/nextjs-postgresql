import { Button, TextField } from "@mui/material";

export default function Login() {
    return (
        <div className={`bg-gradient-to-br from-[#0D7DBB] from-[5%] via-[#013BA6] via-[percentage:20%_70%] to-[#1085BB] t-[100%]
         h-auto py-4 sm:h-screen flex justify-center items-center`}>
            <div className="w-[95%] sm:w-1/2 lg:w-1/3 h-[500px] mx-auto rounded-lg bg-white flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-center">Login</h1>
                <form className="flex flex-col gap-8 w-[80%] mx-auto">
                    <TextField className="w-full" label="Username" type="text" variant="standard" />
                    <TextField className="w-full" label="Pasword" type="password" variant="standard" />
                    <Button sx={{ color: 'white' }} variant="contained"
                        className="text-white w-full h-14 bg-gradient-to-br from-[#0D7DBB] via-[#013BA6] to-[#1085BB]">Login</Button>
                </form>
            </div>
        </div>
    )
}
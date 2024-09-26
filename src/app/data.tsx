// 'use client'

// import { ChangeEvent, useEffect, useState } from "react"
// // import CancelIcon from '@mui/icons-material/Cancel';
// // import Swal from 'sweetalert2'

// export default function UsersData() {
//     const [isEdit, setisEdit] = useState(false)
//     const [usersData, setusersData] = useState([])
//     const [name, setname] = useState<string>('')
//     const [message, setmessage] = useState('')
//     const [editmessage, seteditmessage] = useState('')
//     const [isFetch, setisFetch] = useState(true)
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL
//     useEffect(() => {
//         setisFetch(false)
//         setname('')
//         const fetchData = async () => {
//             const postData = {
//                 method: 'GET',
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             }
//             const res = await fetch(`${apiUrl}/api/users`, postData)
//             const response = await res.json()
//             setmessage(response.message)
//             setusersData(response.users)
//             setTimeout(() => {

//                 setmessage('')
//             }, 3000);
//         }

//         fetchData()
//     }, [isFetch, editmessage])

//     const addUser = async () => {
//         const postData = {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 name: name,
//             })
//         }
//         const res = await fetch(`${apiUrl}/api/users`, postData)
//         const response = await res.json()
//         // Swal.fire({
//         //     title: "Success!",
//         //     text: response.message,
//         //     icon: "success"
//         // });
//         setisFetch(true)
//     }

//     const edit = async (userId: number) => {
//         const id = userId
//         const postData = {
//             method: 'PUT',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 name: name
//             })
//         }
//         const res = await fetch(`${apiUrl}/api/users/${id}`, postData)
//         const response = await res.json()
//         console.log(response);
//         seteditmessage(response.message)
//         // Swal.fire({
//         //     title: "Success!",
//         //     text: response.message,
//         //     icon: "success"
//         // });
//         // setisEdit(false)
//         setTimeout(() => {
//             seteditmessage('')
//         }, 3000);
//     }

//     const deleteUser = async (userId: number) => {
//         const id = userId
//         const postData = {
//             method: 'DELETE',
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }
//         const res = await fetch(`${apiUrl}/api/users/${id}`, postData)
//         const response = await res.json()
//         setisFetch(true)
//         // Swal.fire({
//         //     title: "Success!",
//         //     text: response.message,
//         //     icon: "success"
//         // });
//         return response
//     }

//     return (
//         <div>
//             <div className="flex justify-center items-start py-4 gap-6">
//                 <div className="w-1/3 space-y-4">
//                     <input
//                         onChange={(e: ChangeEvent<HTMLInputElement>) => setname(e.target.value)}
//                         className="w-full border-2 p-4" value={name} placeholder="Name" type="text" />
//                 </div>
//                 <button onClick={addUser} className="bg-blue-500 text-white rounded-lg px-8 py-4">Add User</button>
//             </div>
//             <div>
//                 {usersData.map((item) => {
//                     const { id, name, create_at } = item
//                     const formattedDate = new Date(create_at).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: '2-digit',
//                         day: '2-digit'
//                     });
//                     return (
//                         <div key={id} className="w-1/2 mx-auto p-3 border-2 space-y-3 my-3">
//                             <div className="flex gap-4 items-center">
//                                 <h1 className="text-xl font-bold">ID:</h1>
//                                 <p>{id}</p>
//                             </div>
//                             <div className="flex gap-4 items-center">
//                                 <h1 className="text-xl font-bold">UserName:</h1>
//                                 <p>{name}</p>
//                             </div>
//                             <div className="flex gap-4 items-center">
//                                 <h1 className="text-xl font-bold">Register Date:</h1>
//                                 <p>{formattedDate}</p>
//                             </div>
//                             {isEdit === id && <div className="space-y-3 border-2 p-4 relative">
//                                 {/* <button onClick={() => setisEdit(false)} className="absolute top-3 right-3">
//                                     <CancelIcon />
//                                 </button> */}
//                                 <h1 className="text-center text-xl text-gray-500">Edit User</h1>
//                                 <input
//                                     onChange={(e: ChangeEvent<HTMLInputElement>) => setname(e.target.value)}
//                                     type="text" placeholder="Name" className="border-2 p-4 w-full" />
//                                 <div>
//                                     {editmessage && <p className="absolute bottom-6 left-[40%]">{editmessage}</p>}</div>
//                                 <button onClick={() => edit(id)} className="bg-blue-400 text-white px-12 py-2">Submit</button>
//                             </div>}
//                             <div className="flex justify-center gap-8">
//                                 <button onClick={() => setisEdit(id)} className="bg-green-400 text-white px-8 py-2">Edit</button>
//                                 <button onClick={() => deleteUser(id)} className="bg-gray-500 text-white px-8 py-2">Delete</button>
//                             </div>
//                         </div>

//                     )
//                 })}
//             </div>
//             {message && <p className="text-center font-semibold text-blue-500 text-xl">{message}</p>}

//         </div>
//     )
// }
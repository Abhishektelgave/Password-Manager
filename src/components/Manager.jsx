import React from 'react'
import { useRef, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [showEmoji, setShowEmoji] = useState(false);
    const [passwordArray, setPasswordArray] = useState([])
    const passRef = useRef();

    // get passwrd from api
    const getPasswords = async () => {
        let req = await fetch('http://localhost:3000/')
        let data = await req.json()
        setPasswordArray(data)
    }
    // onload use to get all stored passwords
    useEffect(() => {
        getPasswords()
    }, [])

    // toggle passowrd to show
    const showPassword = () => {
        passRef.current.type = passRef.current.type === "text" ? "password" : "text";
        setShowEmoji((prev) => !prev);

    }

    // input handler
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // save password to api 
    const savePassword = async (e) => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const res = await fetch('http://localhost:3000/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            // getPasswords() // update api data with new password 
            setPasswordArray([...passwordArray, form])
            toast('👍 Password Saved!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setForm({ site: "", username: "", password: "" })
        } else {
            toast('�� Password should contain at least 4 characters for Site, username and Password', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
    }

    // copy to clipboard
    const copyText = (Text) => {
        toast('👌 Copied to Clipboard', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(Text);
    }

    // edit password -api
    const editPass = async (id) => {
        setForm(passwordArray.filter((p) => p.id === id)[0])
        await fetch('http://localhost:3000/', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
        setPasswordArray(passwordArray.filter((p) => p.id !== id))
    }

    // delete password - api
    const deletePass = async (id) => {
        let c = confirm("Do you want to delete this password?" + id)
        if (c) {
            const res = await fetch('http://localhost:3000/', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
            setPasswordArray(passwordArray.filter((p) => p.id !== id))
            toast('👍 Password Deleted Successfuly!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <>
        {/* Main dev */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="manager md:min-h-[79.9vh] min-h-[82.65vh] w-full">
                <div className="mx-auto  max-w-4xl">
                    <div className="logo flex items-center justify-center mx-5 cursor-pointer font-bold text-2xl">
                        <span className='text-green-700 font-bold text-xl'>&lt;</span>
                        <span>Pass</span>
                        <span className=' text-green-700'>OP</span>
                        <span className='text-green-700 font-bold text-xl'>/&gt;</span>
                    </div>
                    <p className='text-green-900 text-center'>Your own Password Manager</p>
                    {/* Input container -------- */}
                    <div className="flex  px-10  flex-col items-center ">
                        <input onChange={handleChange} value={form.site} placeholder='Enter Your Wbsite URL' className='border border-green-700 placeholder:text-green-600 p-1 rounded-full w-full my-3' type="text" name='site' />
                        <div className="flex items-center justify-between w-full my-1 gap-2">
                            <input onChange={handleChange} value={form.username} name='username' placeholder='Enter username' className='border placeholder:text-green-600 border-green-700 my-1 p-1  rounded-full w-full' type="text" />
                            <div className="relative w-full flex items-center">
                                <input ref={passRef} onChange={handleChange} name='password' value={form.password} placeholder='Enter Password' className='border placeholder:text-green-600 border-green-700 my-1 p-1 rounded-full w-full' type="password" />
                                <span className='cursor-pointer absolute right-2 top-[2px]' onClick={showPassword} >
                                    {showEmoji ? <picture>
                                        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f648/512.gif" alt="" width="32" height="32" />
                                    </picture>
                                        : <img className='' src="./images/eye.png" width={32} alt="" />}
                                </span>
                            </div>
                        </div>
                        {/* save Password BTN ---------- */}
                        <button onClick={savePassword} className="flex w-fit items-center justify-center font-bold border border-green-700 px-8 py-1 rounded-full my-4 bg-green-400 hover:bg-green-500 transition-all ease-in-out">
                            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                            Save Password
                        </button>
                    </div>
                    {passwordArray.length > 0 ? <p className='md:text-green-700 md:text-xl font-bold mx-5 md:text-left mb-5 text-center text-sm'>Your Password's</p> : ""}
                    {passwordArray.length > 0 ?
                    // Display the password | Read op ---------
                        <div className="overflow-x-auto rounded-lg mb-5">
                            <table className="min-w-full divide-y divide-gray-200 bg-green-100">
                                <thead className='bg-green-700 text-white'>
                                    <tr>
                                        <th className='py-2'>Website URL</th>
                                        <th className='py-2'>username</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className='border border-white py-2'>
                                                <div className="flex items-center justify-between px-5">
                                                    <a href={item.site} target='_blank' rel='noopener noreferrer' className="truncate">{item.site}</a>
                                                    <div onClick={() => { copyText(item.site) }} className='cursor-pointer'><lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></div>
                                                </div>
                                            </td>
                                            <td className='border border-white py-2'>
                                                <div className="flex items-center justify-between px-5">
                                                    <span className="truncate">{item.username}</span>
                                                    <div onClick={() => { copyText(item.username) }} className='cursor-pointer'><lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></div>
                                                </div>
                                            </td>
                                            <td className='border border-white py-2'>
                                                <div className="flex items-center justify-between px-5">
                                                    <span className="truncate">{"*".repeat(item.password.length)}</span>
                                                    <div onClick={() => { copyText(item.password) }} className='cursor-pointer'><lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></div>
                                                </div>
                                            </td>
                                            <td className='border border-white py-2'>
                                                <div className="flex items-center justify-center">
                                                    {/* Edit and Delete Action BTN ----------- */}
                                                    <span onClick={() => { editPass(item.id) }} className='cursor-pointer mx-2'><lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon></span>
                                                    <span onClick={() => { deletePass(item.id) }} className='cursor-pointer mx-2'><lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon></span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        : <p className='text-black text-center text-xl mx-5 my-5'>No Password's Added</p>}
                </div>
            </div>
        </>
    )
}

export default Manager
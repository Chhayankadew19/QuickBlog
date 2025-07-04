import React from 'react'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const {axios,setToken}=useAppContext();
    const navigate=useNavigate();

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const{data}=await axios.post('/api/admin/signup',{email,password});
            if(data.success){
                // setToken(data.setToken);
                // localStorage.setItem('token',data.token);
                // axios.defaults.headers.common['Authorization']=data.token;
                toast.success("Signup sucessfully!");
                navigate('/admin');
            }else{
                toast.error(data.message);
            }
        }catch(e){
            toast.error(e.message);
        }
    }
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-full py-6 text-center'>
                    <h1 className='text-3xl font-bold'>
                        <span className='text-primary'>Admin </span>
                        Signup
                    </h1>
                    <p className='font-light'>Create an account to access the admin Panel</p>
                </div>
                <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                    <div className='flex flex-col'>
                        <label>Email</label>
                        <input onChange={e=>setEmail(e.target.value)} type="email"  value={email} required placeholder='Enter Email' className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Password</label>
                        <input onChange={e=>setPassword(e.target.value)} value={password} type="text" required placeholder='Enter Password' className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
                    </div>
                    <button type='submit' className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'> Signup</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup
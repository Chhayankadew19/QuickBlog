import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

function Navbar() {

    const {navigate , token }=useAppContext();

  return (
    <div className=' flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="Logo" className='w-32 sm:w-44 cursor-pointer' />
      {token?(
        <button onClick={()=>navigate("/admin")} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 oy-2.5'>
          Dashboard
          <img src={assets.arrow} className='w-3' alt="arrow" />  
        </button>
      ):(
        <div className='flex gap-4'>
          <button onClick={()=>navigate('/admin')} className='rounded-full text-sm bg-primary text-white px-6 py-2.5'>
            Login
          </button>
           <button onClick={()=>navigate('/admin/signup')} className='rounded-full text-sm bg-primary text-white px-6 py-2.5'>
            Signup
          </button>

        </div>
      )}
      
    </div>
  )
}

export default Navbar

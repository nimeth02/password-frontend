"use client"
import { Tooltip } from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Nav() {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const handleLogout = () => {
    console.log("logout")
     if (typeof window !== 'undefined') {
                        localStorage.removeItem("userInfo")
    router.push("/signin")
                    }
   
  }
   if (typeof window !== 'undefined') {
                        console.log(JSON.parse(localStorage.getItem("userData")))
  const User = JSON.parse(localStorage.getItem("userData"))
                    }
 
  return (
    <div className='flex flex-col justify-center items-center h-[100vh] fixed '>
      <div className='flex flex-col justify-between gap-10  rounded-r-xl bg-cyan-500 px-1 py-4'>
        <Link href="/">
          <div className='hover:text-black hover:bg-cyan-700  rounded-full p-2'>


            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
        </Link>
        <div onClick={() => { setShow(!show) }} className='relative hover:text-black hover:bg-cyan-700  rounded-full p-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          {show && <div class="absolute z-50 shadow-[0_0px_10px_0px_rgba(0,130,140,0.3)] whitespace-normal top-1 left-[50px] break-words rounded-lg  py-1.5 bg-white px-3 font-sans text-sm font-normal text-black focus:outline-none">
            <div className='p-4'>
              <div className='flex gap-2 items-center'>
                <div className='font-bold text-md'>FullName</div>
                <div className='text-gray-600'>{User.fullname}</div>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='font-bold text-md'>Email</div>
                <div className='text-gray-600'>{User.email}</div>
              </div>
            </div>

          </div>}
        </div>



        <div onClick={handleLogout} className='hover:text-black hover:bg-cyan-700  rounded-full p-2'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" fill="currentColor" class="w-6 h-6 text-white">
            <path fill-rule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </div>

      </div>
    </div>
  )
}

export default Nav

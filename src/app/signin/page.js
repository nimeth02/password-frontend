"use client"
import { Button, Card, CardBody, CardFooter, Input, Typography, div } from '@material-tailwind/react'
import axios from 'axios'
import React, { useState } from 'react'
import { axiosInstance } from '../config/axios.config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const initialUser = {  email: "", password: "" }
function Signin() {
  const [user, setUser] = useState(initialUser)
  const {  email, password } = user
  const router = useRouter()
  const handleSubmit = async () => {  

    if ( !email || !password) {
      toast.warn('Fill all fields', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    try {

      const { data } = await axiosInstance.post('/api/user/signin', user)
      console.log(data.token, "data")
      toast.success('Signup successfully', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
       if (typeof window !== 'undefined') {
                       localStorage.setItem("userInfo", JSON.stringify(data.token.token));
      localStorage.setItem("userData", JSON.stringify(data.token.existUser));
           router.push('/', undefined, { shallow: true, scroll: false, reload: true })
                    }
      
      setUser(initialUser)
    
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }
  return (
    <div className='mt-20'>
      <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <div   className='text-xl text-black flex justify-center'>
              Sign In
            </div>
           
            <div className="-mb-2" variant="h6" >
               Email
            </div>
            <Input label="Email" size="lg" value={email} onChange={(e) => { setUser((u) => ({ ...u, email: e.target.value })) }}/>
            <div className="-mb-2" variant="h6"  >
               Password
            </div>
            <Input label="Password" size="lg" value={password} onChange={(e) => { setUser((u) => ({ ...u, password: e.target.value })) }}/>
          
          </CardBody>
          <CardFooter className="pt-0">
            <Button className='text-md'  fullWidth onClick={handleSubmit}>
             <div>Sign In</div> 
            </Button>
            <div variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Link href={'/signup'}><Typography
              as="a"
              href="/signin"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign Up
            </Typography></Link>
            </div>
          </CardFooter>
        </Card>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  )
}

export default Signin

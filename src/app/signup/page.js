"use client"
import { Button, Card, CardBody, CardFooter, Input, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useState } from 'react'
import { axiosInstance } from '../config/axios.config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const initialUser = { fullname: "", email: "", password: "" }
function Signup() {
  const [user, setUser] = useState(initialUser)
  const { fullname, email, password } = user
  const router = useRouter()
  const handleSubmit = async () => {

    

    if (!fullname || !email || !password) {
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

      const { data } = await axiosInstance.post('/api/user/signup', user)
      console.log(data, "data")
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
      setUser(initialUser)
      router.push('/signin')
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
          <div color="blue-gray" className='text-xl text-black flex justify-center'>
            Sign Up
          </div>

          <div className="-mb-2" variant="h6">
            Fullname
          </div>
          <Input label="Fullname" size="lg" value={fullname} onChange={(e) => { setUser((u) => ({ ...u, fullname: e.target.value })) }} />
          <div className="-mb-2" variant="h6">
            Email
          </div>
          <Input label="Email" size="lg" value={email} onChange={(e) => { setUser((u) => ({ ...u, email: e.target.value })) }} />
          <div className="-mb-2" variant="h6">
            Password
          </div>
          <Input label="Password" size="lg" value={password} onChange={(e) => { setUser((u) => ({ ...u, password: e.target.value })) }} />

        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" className='text-md' fullWidth onClick={handleSubmit}>
            Sign Up
          </Button>
          <div variant="small" className="mt-4 flex justify-center">
            Already have an account?
            <Link href={'/signin'}><Typography
              as="a"
              href="/signin"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign In
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

export default Signup
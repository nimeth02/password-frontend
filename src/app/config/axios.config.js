"use client"
import axios from 'axios';

 if (typeof window !== 'undefined') {
                       console.log(JSON.parse(localStorage.getItem("userInfo")))
                    }


export const axiosInstance = axios.create({
  baseURL: 'https://password-backend-am48.onrender.com',
  headers: {
    Authorization: `Bearer ${ typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("userInfo")) : ''}`
  }
});

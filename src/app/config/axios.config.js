import axios from 'axios';

 if (typeof window !== 'undefined') {
                       console.log(JSON.parse(localStorage.getItem("userInfo")))
                    }


export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${ typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("userInfo")) : ''}`
  }
});

import axios from 'axios';

console.log(JSON.parse(localStorage.getItem("userInfo")))

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo"))}`
  }
});
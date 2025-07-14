import _axios from 'axios'
console.log('!@#NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL)
export const axios = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // headers: { "x-auth-token": `${getToken()}` },
    timeout: 10000
})
import axios from "axios"

export const getMeetToken=()=>{
   
    const res = axios.get(`http://localhost:3000/getToken`)
    return res
}
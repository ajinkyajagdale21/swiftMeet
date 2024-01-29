import axios from "axios"

export const getMeetToken=(room,user)=>{
   
    const params={
        "roomName":room,
        "participantName":user
    }
    const res = axios.get(`http://localhost:3000/getToken`,{params})
    return res
}
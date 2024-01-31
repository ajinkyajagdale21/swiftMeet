import React, { useState } from 'react'
import style from './MeetupForm.module.css'
import { toast } from 'react-toastify'
import { getMeetToken } from '../../services/api'
import Cookies from 'js-cookie'
import { useAuth0 } from '@auth0/auth0-react'

export const MeetupForm = ({setMeetingView}) => {
   const [joinMeet,setJoinMeet]=useState(true)
   const [formValues,setformValues]=useState("")
   const { user } = useAuth0();

   const handleOptionChange = () => {
    setformValues("")
    setJoinMeet(!joinMeet);
  };

  const joinMeetingHandler=(e)=>{
    e.preventDefault()
    if(formValues==""){
      toast.warning("Please enter room name to continue")
    }
    else{
      const setMeetToken=async()=>{
        
        const token= await getMeetToken(formValues,user?.name)
        Cookies.set('meetToken',token.data,{ expires: 1 })
        setMeetingView(true)
       }
       setMeetToken()
    }
  }

   return (
    <div>
        <p className={style.formHeader}>Ready to join or create Meetup</p>
        <label className='px-3 lg:px-5 pt-2 pb-5 '>
        <input
          type="radio"
          value="option1"
          checked={joinMeet == true}
          onChange={handleOptionChange}
          className='mx-1 lg:mx-2'
          style={{accentColor:"red"}}
        />
            Join room
        </label>
        <label>
        <input
          type="radio"
          value="option1"
          checked={joinMeet == false}
          onChange={handleOptionChange}
          className='mx-1 lg:mx-2'
          style={{accentColor:"red"}}
        />
            Create room
        </label>
      {
         joinMeet?
         <form onSubmit={joinMeetingHandler}>
            <input placeholder='Enter room name' className={style.inputs} value={formValues} onChange={(e)=>setformValues(e.target.value)}/>
            <button type='submit' className={style.formBtn}>Join</button>
         </form>
         :
         <form onSubmit={joinMeetingHandler}>
         <input placeholder='Enter room name' className={style.inputs} value={formValues} onChange={(e)=>setformValues(e.target.value)}/>
         <button type='submit' className={style.formBtn}>Create</button>
        </form>

      }
    </div>
  )
}

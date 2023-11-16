import './App.css'
import '@livekit/components-styles';
import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
} from '@livekit/components-react';

import { MyVideoConference } from './components/MyVideoConference';
import { useEffect } from 'react';
import { getMeetToken } from './services/api';
import Cookies from 'js-cookie';

const serverURL = import.meta.env.VITE_SERVER_URL 

function App() {

  useEffect(()=>{
    const setMeetToken=async()=>{
      
     const token= await getMeetToken()
     Cookies.set('meetToken',token.data,{ expires: 1 })
    }
    setMeetToken()
    
  },[])

  return (
    <>
     <h1 style={{color:"#CBC7F8",textAlign:"center"}}>Swift Meet</h1>
     <LiveKitRoom
      video={true}
      audio={true}
      token={Cookies.get('meetToken')}
      connectOptions={{ autoSubscribe: false }}
      serverUrl={serverURL}
      data-lk-theme="default"
      style={{ height: '100vh' }}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
    </>
  )
}

export default App

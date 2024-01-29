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
import { Navbar } from './components/navbar/Navbar';
import { HeroComponent } from './components/heroComponent/HeroComponent';
import { useAuth0 } from '@auth0/auth0-react';

const serverURL = import.meta.env.VITE_SERVER_URL 

function App() {
  
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  useEffect(()=>{
    
    if(isAuthenticated ){
    const setMeetToken=async()=>{
      
     const token= await getMeetToken("fmRoom",user?.name)
     Cookies.set('meetToken',token.data,{ expires: 1 })
    }
    setMeetToken()
  }
  },[isAuthenticated])

  return (
    <>
    <Navbar/>

    {isAuthenticated ?
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
    : 
  <>
  <div className='d-flex justify-content-center'>
    <HeroComponent/>
  </div>
  <div className='d-flex justify-content-center'>
    <button className="genralButtons">Get started</button>
  </div>
  </>
}
    </>
  )
}

export default App

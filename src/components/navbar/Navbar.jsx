import React from 'react'
import style from '../navbar/Navbar.module.css'
import { useAuth0 } from '@auth0/auth0-react';

export const Navbar = ({setMeetingView}) => {
  
const { isAuthenticated,loginWithRedirect,logout } = useAuth0();
    
  return (
    <div className={style.navbarContainer}>
        <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
    <div className={`${style.navbarBrand}`} onClick={()=>setMeetingView(false)}>Swift MeetUp</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      <div className="d-flex" >
      <div className='d-flex align-items-center'>
      <p className="m-0">{new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "Asia/Kolkata" // Specify IST time zone
      }).replace(" at ", " ")}</p>
      {
        isAuthenticated?
        <button className={style.loginBtn} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
        :
        <button className={style.loginBtn} onClick={()=>loginWithRedirect()}>Login</button>
      }
        </div> 
      </div>
    </div>
  </div>
</nav>
        


    </div>
  )
}

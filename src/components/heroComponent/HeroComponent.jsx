import React from 'react'
import style from './HeroComponent.module.css'
import handshakeImg from '../../assets/fist-bump-gesture.png'

export const HeroComponent = () => {
  return (
   <>
    <div className={style.heroContainer}>
        <p className={style.heroText}>Effortlessly organize and join meetups with Swift Meetup. Connect with like-minded individuals, spark meaningful conversations, and build lasting relationships. All powered by the lightning-fast technology of LiveKit and ReactJS.</p>
        <img src={handshakeImg} alt="handshakeImg" className={style.handImg}/>
    </div>
    </>  
  )
}

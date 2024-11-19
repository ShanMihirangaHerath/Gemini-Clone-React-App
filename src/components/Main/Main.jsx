import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'

const Main = () => {
  return (
    <div className='main'>
      <div className='nav'>
        <p>NovaMind</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className='main-container'>
        <div className='greet'>
            <p><span>Hey, ShanDev.</span></p>
            <p>Welcome to NovaMind workspace!<br/>
            How can I help you today?</p>
        </div>
        <div className='cards'>
            <div className='card'>
                <p>Suggest beautigul palces to see on an upcoming trip</p>
                <img src={assets.compass_icon} alt="" />
            </div>
            <div className='card'>
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
            </div>
            <div className='card'>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
            </div>
            <div className='card'>
                <p>Improve the readability of follwing code</p>
                <img src={assets.code_icon} alt="" />
            </div>
        </div>
        <div className='main-bottom'>
            <div className='search-box'>
                <input type='text' placeholder="Provide your request, and I'll simplify or reword it!" />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    <img src={assets.send_icon} alt="" />
                </div>
            </div>
            <p className='bottom-info'>
                <span>Powered by NovaMind AI | </span>
                <span>Version 1.0.0 | </span>
                <span>Made with by ShanDev(SoloCoder)</span>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Main

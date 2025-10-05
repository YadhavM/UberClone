import React, { useContext, useEffect } from 'react'
import logo from '../images/logo.png'
import '../css/Home.css'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { CaptainDataContext } from '../context/CaptainContext'

function Start() {

  return (
    
    <div className='w-screen h-screen overflow-hidden'>

      <div className='absolute '>
            <img src={logo} alt="" className='w-35'/>
          </div>


      <div className="h-full">
        <div className='4/6'>
          <img className="w-full " src="https://i.pinimg.com/1200x/5a/57/62/5a576275aea1c90db9d5fc30453f79f7.jpg" alt=""/>
        </div>

        <div className='w-full h-1/6 flex  flex-col justify-center  px-4 py-6'> 
          <h2 className='text-2xl font-semibold'>Get started with Uber</h2>

                  <div className='w-full h-full flex justify-center py-4 px-2'>

                        <Link to='/login' className='flex items-center rounded justify-center w-full bg-black text-white py-3 px-3'>Continue →</Link>

                  </div>
          </div>
      </div>
    </div>
  )
}

export default Start

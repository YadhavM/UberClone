import React from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Start from './pages/Start'

import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import Userlogout from './pages/Userlogout'
import Home from './pages/Home'
import UserProtected from './pages/UserProtected'

import CaptainProtected from './pages/CaptainProtected'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
const App = () => {
  return (
    <div>
      <Routes>

        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/riding' element={
          <UserProtected > 
              <Riding/>
          </UserProtected>
          }/>
        <Route path='/signup' element={<UserSignUp/>}/>
        <Route path='/home' element={
          <UserProtected>
              <Home/>
          </UserProtected>
        }/>
        <Route path='/user-logout' element={
          <UserProtected>
              <Userlogout/>
          </UserProtected>
        }/>


          
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignUp/>}/>
        <Route path='captain-home' element={
          <CaptainProtected>
              <CaptainHome/>
         </CaptainProtected>
          }/>
          <Route path='captain-logout' element={
            <CaptainProtected> 
              <CaptainLogout/>
            </CaptainProtected>
          }/>
          <Route path='/captain-riding' element={
            <CaptainProtected>
                <CaptainRiding/>
            </CaptainProtected>
            }/>

      </Routes>
    </div>
  )
}

export default App

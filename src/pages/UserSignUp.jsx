import React, { useContext, useState } from 'react'
import logo from '../images/logo.png'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'
import {DatabaseContext} from '../context/DatabaseContext'

function UserSignUp() {

  const [email,setEmail] = useState('') ; 
  const [firstname,setFirstname] = useState('') ; 
  const [lastname,setLastname] = useState('') ; 
  const [password,setPassword] = useState('') ;
  const [loading ,setLoading] = useState(false)

  const navigate = useNavigate() ;

  const {user , setUser} = useContext(UserDataContext) ;
  const {apiKey} = useContext(DatabaseContext)
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const newUser = {
      email : email,
      password : password,
      fullname :{
        firstname: firstname,
        lastname: lastname
      },}
    const response = await axios.post(`${apiKey}/users/register`, newUser)

    if(response.status === 201){
      const data = response.data ;

      setUser(data.user)
      setLoading(false)
      localStorage.setItem('token' , data.token)
      navigate('/home')
    }

    setEmail('');
    setPassword('');
  };
  
  return (
    <div className='p-7 flex h-screen flex-col justify-between'>
      <div className="">
            <img src={logo} alt="" className='w-20 ' />
          <form action="" onSubmit={(e)=>{
            handleSubmit(e)
          }}>
            <h3 className="text-lg mb-2">What's Your Name ?</h3>

            <div className="flex flex-row gap-2"> 
                <input 
                type="text" 
                name="firstname" 
                placeholder='Firstname'
                required
                onChange={(e)=>setFirstname(e.target.value)}
                value={firstname} 
                className='rounded bg-[#eeeeee] w-1/2 px-4 py-2 mt-2 text-lg placeholder:text-base  focus:outline-none'/>

                <input 
                type="text" 
                name="lastname"
                value={lastname}
                onChange={(e)=>setLastname(e.target.value)}
                placeholder="Lastname" 
                required
                className='rounded bg-[#eeeeee] w-1/2 px-4 py-2 mt-2 text-lg placeholder:text-base  focus:outline-none'/>
            </div>

            <h3 className="text-lg mb-2 mt-7">Let us Know your Email </h3>
            <input 
            type="email" 
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="email@example.com" 
            required
            className='rounded bg-[#eeeeee] px-4 py-2 mb-3 w-full text-lg placeholder:text-base  focus:outline-none'/>
            <h3 className='text-lg mb-2 mt-4'>Enter Your Password</h3>
            <input 
            type="password" 
            name="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="" required 
            placeholder='password'
            className='rounded bg-[#eeeeee] w-full px-4 py-2  text-lg placeholder:text-base mb-10 focus:outline-none '/>
            <button className='bg-[#111] text-[#fff] font-semibold w-full py-2 px-4 rounded mb-2'>Create Account</button>
            <p className='text-center'>Already have an account ? <Link to="/login" className='text-blue-600'>Login to Uber</Link></p>
          </form>
      </div>
      <div className="">
        <p className='text-xs leading-tight '>By proceding you consent to get calls , WhatsApp or SMS message, including by automated means, from Uber and its affiliates to the email Provided</p>
      </div>

      <div className="fixed top-0 left-0">
        {loading && (
            <div className="fixed h-screen w-screen top-0 flex items-center justify-center z-50 transparent-bg text-black">
              <div className="w-50 h-40 bg-gray-200 rounded-xl flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default UserSignUp

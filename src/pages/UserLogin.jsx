import React, { useState , useContext} from 'react'
import logo from '../images/logo.png'
import { Link ,useNavigate} from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import { DatabaseContext } from '../context/DatabaseContext'
import axios from 'axios'
function UserLogin() {

  const [email,setEmail] = useState('') ; 
  const [password,setPassword] = useState('') ; 
  const {user , setUser} = useContext(UserDataContext) ;
  const {Key} = useContext(DatabaseContext)
  const [loading ,setLoading] = useState(false)
  const [errors,setErrors] = useState(null)

  const navigate = useNavigate() ; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    
    try {
      const loginData = {email,password} ;

        const userData = {
          email : email , 
          password : password , 
        }
        const response = await axios.post(`${Key}/users/login`, userData)
        
        if(response.status === 200){

          const data = response.data ; 

          setUser(data.user)
          setLoading(false)
          localStorage.setItem('token' , data.token)
          navigate("/home") ; 
      
        setEmail('');
        setPassword('');
      }
    }catch(error) { 
      
        const errors = error.response.data
        setLoading(false)
        errors.message ? setErrors(errors.message) : setErrors(errors.errors[0].msg)
        
    }
}

  return (
    <div className='p-7 pb-20 flex h-screen flex-col justify-between'>

      <div className="">
            <img src={logo} alt="" className='w-20 mb-5' />
          <form action="" onSubmit={(e)=>{
            handleSubmit(e)
          }}>
            <h3 className="text-lg mb-2">Whats Your Email? </h3>
            <input 
            type="email" 
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="email@example.com" 
            required
            className='rounded bg-[#eeeeee] px-4 py-2 mb-3 w-full text-lg placeholder:text-base  focus:outline-none'/>
            <h3 className='text-lg mb-2'>Enter Your Password</h3>
            <input 
            type="password" 
            name="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="" required 
            placeholder='password'
            className='rounded bg-[#eeeeee] w-full px-4 py-2  text-lg placeholder:text-base mb-10 focus:outline-none '/>
              {
                errors ? (
                  <div className="w-full items-center justify-center flex mb-3 text-red-500 text-center">
                    <p className='items-center justify-center'>{errors}</p>
                  </div>
                ) : ''
              }
              

            <button className='bg-[#111] text-[#fff] font-semibold w-full py-2 px-4 rounded mb-2'>Login to uber</button>
            <p className='text-center'>New Here ? <Link to="/signup" className='text-blue-600'>Create an account</Link></p>
          </form>
            
      </div>


      <div className="">
        <Link to="/captain-login"className='w-full flex justify-center bg-[#8C5E58] py-3 px-4 text-white rounded font-semibold'>
          Sign in as Captain
        </Link>
      </div>

      <div className='fixed top-0 left-0'>
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


export default UserLogin

import React, { useContext, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { DatabaseContext } from '../context/DatabaseContext';
function CaptainSignUp() {

  const navigate = useNavigate() ;

  const {captain , setCaptain} = useContext(CaptainDataContext) ;
  const {Key} = useContext(DatabaseContext)
  
  const [email,setEmail] = useState('') ; 
  const [firstname,setFirstname] = useState('') ; 
  const [lastname,setLastname] = useState('') ; 
  const [password,setPassword] = useState('') ;
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [loading ,setLoading] = useState(false)
  const [errors,setErrors] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    
    try{
            const CaptainData = ({
            email,
            password,
            fullname :{
              firstname,
              lastname
            },
            vehicle : { 
              color : vehicleColor,
              plate : vehiclePlate,
              capacity : vehicleCapacity,
              vehicleType,
            },

          })

          const response = await axios.post(`${Key}/captains/register`, CaptainData)

          if(response.status === 201){
            const data = response.data ;
            setCaptain(data.captain)
            setLoading(false)
            localStorage.setItem('token' , data.token)
            navigate('/captain-home')
          }

          setEmail('');
          setFirstname('')
          setPassword('');
          setVehicleType('')
          setVehiclePlate('')
          setLastname('')
          setVehicleColor('')
          setVehicleCapacity('')
    }catch(error) { 
      
        const errors = error.response.data
        setLoading(false)
        errors.message ? setErrors(errors.message) : setErrors(errors.errors[0].msg)
        
      
    }


  };


  return (
    <div className='p-7 flex h-screen flex-col justify-between'>

      <div className="">
            <img src={'https://imgs.search.brave.com/Xr5AE-qF9u_eA3dArDHLnzd2OmEM7V44OSXOCtcAsuk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1OTc2MTQy/NXViZXItZHJpdmVy/LWxvZ28tcG5nLnBu/Zw'} alt="" className='w-10 mb-2 ' />
          <form action="" onSubmit={(e)=>{handleSubmit(e)}}>
            <h3 className="text-base ">What's Your Name Captain ?</h3>

            <div className="flex flex-row gap-2"> 
                <input 
                type="text" 
                name="firstname" 
                placeholder='Firstname'
                required
                onChange={(e)=>{setFirstname(e.target.value)}}
                value={firstname} 
                className='rounded bg-[#eeeeee] w-1/2 px-4 py-2 mt-2 text-sm placeholder:text-base  focus:outline-none'/>

                <input 
                type="text" 
                name="lastname"
                value={lastname}
                onChange={(e)=>setLastname(e.target.value)}
                placeholder="Lastname" 
                required
                className='rounded bg-[#eeeeee] w-1/2 px-4 py-2 mt-2 text-sm placeholder:text-base  focus:outline-none'/>
            </div>

            <h3 className="text-base mb-2 mt-3">What's our Captains Email ? </h3>
            <input 
            type="email" 
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="email@example.com" 
            required
            className='rounded bg-[#eeeeee] px-4 py-2  w-full text-base placeholder:text-base  focus:outline-none'/>
            <h3 className='text-base mb-2 mt-4'>Enter Your Password</h3>
            <input 
            type="password" 
            name="password" 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            id="" required 
            placeholder='password'
            className='rounded bg-[#eeeeee] w-full px-4 py-2  text-lg placeholder:text-base  focus:outline-none '/>
            <h3 className='text-base mt-4'>Vehicle Information</h3>
            <div className="flex flex-row gap-2 mb-4"> 
                <input 
                type="text" 
                name="Vehicle Colour" 
                placeholder='Vehicle Colour'
                required
                onChange={(e)=>{setVehicleColor(e.target.value)}}
                value={vehicleColor} 
                className='rounded bg-[#eeeeee] w-1/2 px-4 py-2 mt-2 text-sm placeholder:text-base  focus:outline-none'/>

                <input 
                type="text" 
                name="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e)=>{setVehiclePlate(e.target.value)}}
                placeholder="Vehicle Plate" 
                required
                className='rounded bg-[#eeeeee] w-1/2 px-4 py-2 mt-2 text-sm placeholder:text-base  focus:outline-none'/>

                
            </div>
            <div className="flex flex-row gap-2 mb-8"> 
                <input 
                type="number" 
                name="Vehicle Capacity" 
                placeholder='Vehicle Capacity'
                required
                onChange={(e)=>{setVehicleCapacity(e.target.value)}}
                value={vehicleCapacity} 
                className='rounded bg-[#eeeeee] w-1/2 px-4 py-2 mt-2 text-sm placeholder:text-base  focus:outline-none'/>

                <select
                  name="Vehicle Type"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  required
                  className='rounded bg-[#eeeeee] w-1/2 px-4 py-2 mt-2 text-sm placeholder:text-base focus:outline-none'

                >
                  <option value="">Vehicle Type</option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Rickshaw">Rickshaw</option>
                  <option value="Van">Van</option>
                </select>
            </div>
              {
                  errors ? (
                    <div className="w-full items-center justify-center flex mb-3 text-red-500 text-center">
                      <p className='items-center justify-center'>{errors}</p>
                    </div>
                  ) : ''
              }
            <button className='bg-[#111] text-[#fff] font-semibold w-full py-2 px-4 rounded mb-2'>Create Captain Account</button>
            <p className='text-center text-[15px]'>Already have an account ? <Link to="/captain-login" className='text-blue-600'>Login as Captain</Link></p>
          </form>
      </div>

      <div className="">
        <p className='text-xs leading-tight '>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span></p>
      </div>

      <div className='fixed top-0 left-0'>
        {loading && (
            <div className="fixed h-screen w-screen transparent-bg top-0 flex items-center justify-center z-50  text-black">
              <div className="w-50 h-40 bg-gray-200 rounded-xl flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            </div>
          )}
      </div>

    </div>
  )
}

export default CaptainSignUp

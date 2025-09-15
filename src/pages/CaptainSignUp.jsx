import React, { useContext, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
function CaptainSignUp() {

  const navigate = useNavigate() ;

  const {captain , setCaptain} = useContext(CaptainDataContext) ;

  
  const [email,setEmail] = useState('') ; 
  const [firstname,setFirstname] = useState('') ; 
  const [lastname,setLastname] = useState('') ; 
  const [password,setPassword] = useState('') ;
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, CaptainData)

    if(response.status === 201){
      const data = response.data ;
      setCaptain(data.captain)
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
            <button className='bg-[#111] text-[#fff] font-semibold w-full py-2 px-4 rounded mb-2'>Create Captain Account</button>
            <p className='text-center text-[15px]'>Already have an account ? <Link to="/captain-login" className='text-blue-600'>Login as Captain</Link></p>
          </form>
      </div>
      <div className="">
        <p className='text-xs leading-tight '>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span></p>
      </div>
    </div>
  )
}

export default CaptainSignUp

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef ,useState,useEffect ,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DatabaseContext } from '../context/DatabaseContext'


const ConfirmRidePopUpPanel = (props) => {

  const navigate = useNavigate()

    const {setConfirmRidePopUp,setRidePopUpPanel , Location} = props 
    const {Key} = useContext(DatabaseContext)


    const [otp,setOtp] = useState('')
    const [Errors,setErrors] = useState('')
    

    const SubmitHandler = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.get(`${Key}/rides/start-ride`, {
          params : {
            rideId : props.ride._id , 
            otp : otp 
          }, 
          headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })

        if(response.status === 200) { 
          setConfirmRidePopUp(false)
          setRidePopUpPanel(false)
          navigate('/captain-riding',{state : {ride : props.ride , location: Location}})
        }
      } catch (error) {
        const data = error.response.data.errors[0].msg
        setErrors(data)
      }
    };


  return (
    <div className=' z-10 h-screen w-full bg-white'>

        <div className='w-full px-4 py-3'>
            <h2 className='text-lg font-semibold'>Confirm To Start This Ride</h2>
        </div>
        
      {/*Profile Detials*/ }
        <div className='px-2 mb-2 py-3'>
            <div className='w-full bg-yellow-500 rounded-lg flex flex-row px-4 py-3 items-center justify-between'>
                      <div className='flex flex-row gap-3 items-center'>
                        <h2 className='bg-gray-200 px-4 py-3 rounded-full'><i className="text-xl ri-user-3-fill"></i></h2>
                        <h2 className='text-lg font-semibold capitalize'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                      </div>
                      <div className='flex'>
                        <h2 className='text-lg font-semibold'>{Math.round(props.ride?.distance * 10) / 10} KM</h2>
                      </div>
           </div>
        </div>

        {/*Detials*/}
        <div className='overflow-hidden overflow-y-scroll'>
            <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
                <div className='w-9 flex items-center justify-center'>
                  <h2 className=' text-2xl'><i className="ri-user-location-fill"></i></h2>
                </div>
                  <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                    <h2 className='text-lg font-bold'>563/11-A</h2>
                    <p className='text-sm max-h-12 overflow-y-scroll scrollbar-hide'>{props.ride?.pickup}</p>
                  </div>
            </div>

            <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
                <div className='w-9 flex items-center justify-center'>
                  <h2 className=' text-2xl'><i className="ri-map-pin-2-fill"></i></h2>
                </div>
                  <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                    <h2 className='text-lg font-bold'>Location</h2>
                    <p className='text-sm max-h-12 overflow-y-scroll scrollbar-hide'>{props.ride?.destination}</p>
                  </div>
            </div>

            <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
                <div className='w-9 flex items-center justify-center'>
                  <h2 className=' text-2xl'><i className="ri-money-rupee-circle-fill"></i></h2>
                </div>
                  <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                    <h2 className='text-lg font-bold'>${props.ride?.fare}</h2>
                    <p className='text-sm'>Cash , Cash</p>
                  </div>
            </div>

        </div>

        <div className=''>
          <form action="" className='p-3' onSubmit={SubmitHandler}>
            <div className='mt-5'>
              {Errors && <p className='text-red-500 text-center mb-2'>{Errors}</p>}
              <input 
              type="number" 
              name="" 
              id="" 
              placeholder='Enter OTP' 
              onChange={(e)=>{setOtp(e.target.value)}}
              value={otp}
              className='text-base font-mono bg-gray-200 rounded-2xl p-2 border-b-2 border-b-gray-300 mb-5 w-full focus:outline-none text-center'
              />
              <button 
              onclick-={SubmitHandler}
              className='bg-green-700 flex justify-center mb-3 text-white  font-semibold w-full py-2 rounded-md'
              > Accept
              </button>
            <button 
              className='bg-red-500 text-white w-full  font-semibold  py-2 rounded-md'
              >Cancel
              
              </button>
            </div>
          </form>
        </div>
        
    </div>
  )
}

export default ConfirmRidePopUpPanel

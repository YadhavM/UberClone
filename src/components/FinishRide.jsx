import React,{useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DatabaseContext } from '../context/DatabaseContext'
const FinishRide = (props) => {

    const navigate = useNavigate()
    const {setFinishRidePanel} = props
    const {apiKey} = useContext(DatabaseContext)

    const finishRide = async (e)=>{
      e.preventDefault()
      

      const response = await axios.post(`${apiKey}/rides/end-ride` , 
        {
          rideId : props.rideData._id
        },{
          headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      if(response.status === 200) { 
        setFinishRidePanel(false)
        navigate('/captain-home')
      }
    } 

  return (
    <div className=' w-full'>

        <div className='w-full px-4 py-3'>
            <h2 className='text-lg font-semibold'>Finish This Ride</h2>
        </div>
      {/*Profile Detials*/ }
        <div className='px-2 mb-2 py-3'>
            <div className='w-full bg-yellow-500 rounded-lg flex flex-row px-4 py-3 items-center justify-between'>
                      <div className='flex flex-row gap-3 items-center'>
                        <h2 className='bg-gray-200 px-4 py-3 rounded-full'><i className="text-xl ri-user-3-fill"></i></h2>
                        <h2 className='text-lg font-semibold'>{props.rideData?.user.fullname.firstname + " " + props.rideData?.user.fullname.lastname}</h2>
                      </div>
                      <div className='flex'>
                        <h2 className='text-lg font-semibold'>{Math.round(props.rideData?.distance * 10) / 10} KM</h2>
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
                    <p className='text-sm'>{props.rideData?.pickup}</p>
                  </div>
            </div>

            <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
                <div className='w-9 flex items-center justify-center'>
                  <h2 className=' text-2xl'><i className="ri-map-pin-2-fill"></i></h2>
                </div>
                  <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                    <h2 className='text-lg font-bold'>Location</h2>
                    <p className='text-sm'>{props.rideData?.destination}</p>
                  </div>
            </div>

            <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
                <div className='w-9 flex items-center justify-center'>
                  <h2 className=' text-2xl'><i className="ri-money-rupee-circle-fill"></i></h2>
                </div>
                  <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                    <h2 className='text-lg font-bold'>${props.rideData?.fare}</h2>
                    <p className='text-sm'>Cash , Cash</p>
                  </div>
            </div>

        </div>

        <div className='mt-5'>
             
              <button
              className='bg-green-700 flex justify-center mb-3 text-white  font-semibold w-full py-2 rounded-md'
              onClick={finishRide}
              > Finish Ride
              </button>

              <p className='text-red-500 text-xs p-1 text-center'>Click on the Finish Ride Button only if you complete payment</p>
        </div>
        
    </div>
  )
}

export default FinishRide

import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
const RidePopUp = (props) => {
  const {setRidePopUpPanel,setConfirmRidePopUp} = props

  const [confirmRide , setConfirmRide] = useState(false)
    return (
    <div className='p-0 m-0 overflow-y-scroll scrollbar-hide'>

      {/*Top section */}
        <div className='touch-none pb-2 mb-2'>
            <h2 className='text-xl font-semibold px-3 touch-none'>New Ride Available</h2>
        </div>


        {/*Profile Detials*/ }
        <div className='px-2 mb-2'>
            <div className='w-full bg-yellow-500 rounded-lg flex flex-row px-4 py-3 items-center justify-between'>
                      <div className='flex flex-row gap-3 items-center'>
                        <h2 className='bg-gray-200 px-4 py-3 rounded-full'><i className="text-xl ri-user-3-fill"></i></h2>
                        <h2 className='text-lg font-semibold'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                      </div>
                      <div className='flex'>
                        <h2 className='text-lg font-semibold'>{Math.round(props.ride?.distance * 10) / 10} KM</h2>
                      </div>
           </div>
        </div>


        {/*Details*/}
        <div className='overflow-hidden overflow-y-scroll'>
            <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
                <div className='w-9 flex items-center justify-center'>
                  <h2 className=' text-2xl'><i className="ri-user-location-fill"></i></h2>
                </div>
                  <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                    <h2 className='text-lg font-bold'>563/11-A</h2>
                    <p className='text-sm'>{props.ride?.pickup ?? '--'}</p>
                  </div>
            </div>

            <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
                <div className='w-9 flex items-center justify-center'>
                  <h2 className=' text-2xl'><i className="ri-map-pin-2-fill"></i></h2>
                </div>
                  <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                    <h2 className='text-lg font-bold'>Destination</h2>
                    <p className='text-sm'>{props.ride?.destination ?? '--'}</p>
                  </div>
            </div>
            

            <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
                <div className='w-9 flex items-center justify-center'>
                  <h2 className=' text-2xl'><i className="ri-money-rupee-circle-fill"></i></h2>
                </div>
                  <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                    <h2 className='text-lg font-bold'>${props.ride?.fare ?? '--'}</h2>
                    <p className='text-sm'>Cash, Cash</p>
                  </div>
            </div>

        </div>

        {/*Buttons*/}
        <div className='w-full  bg-white  flex items-center justify-center flex-row gap-2 p-3'>
          <button 
              className='bg-gray-300 w-full  font-semibold  py-2 rounded-md'
              onClick={()=>{setRidePopUpPanel(false)}}
              >Ignore
              
              </button>
            <button 
              className='bg-green-700 text-white font-semibold w-full py-2 rounded-md'
              onClick={()=>{

                setConfirmRidePopUp(true)
                props.confirmRide()
              }}
              > Accept
              </button>
            
        </div>

    </div>
  )
}
export default RidePopUp

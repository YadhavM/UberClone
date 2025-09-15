import React,{useEffect} from 'react'

const WaitingForDriver = (props) => {

    const {vehicleImage,WaitingForDriverPanel , WaitingForDriverPanelRef} = props


  return (
    <div className='p-0 m-0 overflow-y-scroll scrollbar-hide'>
      <div>
          <div className='w-full px-2 py-2 border-b-2 border-b-gray-200 flex justify-between items-center'>
              
                <h1 className='text-xl font-semibold py-2'>Meet at the pickup point</h1>
                <div className="px-4 py-2 bg-black  flex flex-col items-center " >
                    <h2 className='text-white text-lg font-semibold'>{Math.round(props.ride?.duration)}</h2>
                    <h3 className='text-white font-semibold'>min</h3>
                </div>
          </div>

          {/*Image section*/}
          <div className="w-full px-8 py-6  flex flex-row items-center justify-between">
            <div>
                
                {vehicleImage ? (
                <img
                  className={
                    vehicleImage ===
                          "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/474bbf7d-56af-4649-9f19-cfadc1a2e696.png" ? 
                          "w-15" : 
                    vehicleImage ===
                          "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/96091ab3-c266-472a-99b5-b78dda3b50cd.png" ?
                            "w-20":
                            "w-25"
                        }
                        src={vehicleImage}
                        alt="vehicle"
                      />
                    ) : null}
            </div>
            <div className='flex flex-col text-right'>
                <h2 className='text-lg font-medium '>{props.ride?.captain.fullname.firstname ?? '--'}</h2>
                <h4 className='text-xl font-semibold'>{props.ride?.captain.vehicle.plate ?? '--'}</h4>
                <p className='text-gray-400 text-sm'>{props.ride?.captain.vehicle.vehicleType ?? '--'}</p>
                <h1 className="text-lg font-semibold">OTP : {props.ride?.otp}</h1>
            </div>
              
          </div>
      </div>

      <div className='w-full h-1 bg-gray-200'></div>
      {/*Details*/}
      <div className='overflow-hidden overflow-y-scroll'>
                    <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
                        <div className='w-9 flex items-center justify-center'>
                            <h2 className=' text-2xl'><i className="ri-map-pin-2-fill"></i></h2>
                        </div>
                            <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                            <h2 className='text-lg font-semibold'>563/11-A</h2>
                            <p className='text-sm'>{props.ride?.pickup ?? '--'}</p>
                            </div>
                    </div>

                    <div className='w-full py-2 flex flex-row items-center px-4 gap-5 '>
                        <div className='w-9 flex items-center justify-center'>
                            <h2 className=' text-sm'><i className="ri-rectangle-fill"></i></h2>
                        </div>
                        <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                            <h2 className='text-lg font-semibold'>Destination</h2>
                            <p className='text-sm'>{props.ride?.destination ?? '--'}</p>
                        </div>
                    </div>
                    
                    <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
                        <div className='w-9 flex items-center justify-center'>
                            <h2 className=' text-2xl'><i className="ri-map-pin-2-fill"></i></h2>
                        </div>
                            <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                            <h2 className='text-lg font-semibold'>${props.ride?.fare ?? '--'}</h2>
                            <p className='text-sm'>Cash , Cash</p>
                            </div>
                    </div>
                    {/*Additional Space*/}
                    <div className='flex flex-row mt-2 border-2 border-transparent active:border-black rounded-md'>
                        <div className='w-15 flex items-center justify-center'>
                        </div>
                        <div className='flex flex-col py-3 pl-10 w-50'>
                          <h4 className='text-lg font-medium'><span className='text-base ml-2'></span></h4>
                          <h5 className='text-sm font-sans'></h5>
                        </div>
                        <div className='px-4 py-6'>
                          <h3 className='text-lg font-bold'></h3>
                        </div>
                    </div>
          
      </div>
      
    </div>
  )
}

export default WaitingForDriver

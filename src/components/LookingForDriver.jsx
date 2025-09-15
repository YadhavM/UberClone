import React from 'react'
import gsap from 'gsap'
import { useDrag } from "@use-gesture/react";
import { useRef } from 'react'

function VehiclePanel(props) {
  const {vehicleImage , setConfirmRidePanel ,LookingForDriverPanelRef,LookingForDriverPanel,setLookingForDriverPanel} = props ;

/*
  const bind = useDrag(
    ({ movement: [, my], last }) => {
      const targetRef =  LookingForDriverPanelRef
      
      if (targetRef?.current) {
        const clampedY = Math.max(0, my);

        if (!last) {
          // move along with finger
          gsap.set(targetRef.current, { y: clampedY });
        } else {
          if (clampedY > 80) {
            gsap.to(targetRef.current, {
              y: "100%",
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                if (LookingForDriverPanel) {
                  setLookingForDriverPanel(false);
                  //setPanelOpen(true);
                }
              },
            });
          } else {
            // snap back to open
            gsap.to(targetRef.current, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        }
      }
    },
    { axis: "y" }
  );
*/

  return (
    <div className='p-0 m-0 overflow-y-scroll scrollbar-hide'>
      <div>
          <div className='touch-none'>

              <div className='w-full flex justify-center'>
                <h1 className='text-xl font-semibold py-2'>Looking for a Driver</h1>
              </div>

              <div className='flex w-full flex-row'>
                <div className='w-1/2 h-1 bg-blue-400 rounded-[100%]'></div>
                <div className='w-1/2 h-1 bg-blue-400 rounded-[100%]'></div>
              </div>
          </div>

          {/*Image section*/}
          <div className="w-full px-8 py-10 h-35 flex items-center justify-center">
              {vehicleImage ? (
                <img
                  className={
                    vehicleImage ===
                          "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/474bbf7d-56af-4649-9f19-cfadc1a2e696.png" ? 
                          "w-20" : 
                    vehicleImage ===
                          "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/96091ab3-c266-472a-99b5-b78dda3b50cd.png" ?
                            "w-30":
                            "w-35"
                        }
                        src={vehicleImage}
                        alt="vehicle"
                      />
                    ) : null}
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
                  <h2 className='text-lg font-bold'>563/11-A</h2>
                  <p className='text-sm'>{props.pickup}</p>
                </div>
            </div>

          <div className='w-full py-2 flex flex-row items-center px-4 gap-5 '>
              <div className='w-9 flex items-center justify-center'>
                <h2 className=' text-sm'><i className="ri-rectangle-fill"></i></h2>
              </div>
              <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                <h2 className='text-lg font-bold'>Destination</h2>
                <p className='text-sm'>{props.destination}</p>
              </div>
          </div>
          <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
               <div className='w-9 flex items-center justify-center'>
                <h2 className=' text-2xl'><i className="ri-money-rupee-circle-fill"></i></h2>
               </div>
                <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                  <h2 className='text-lg font-bold'>$ {props.fare?.fare?.[props.vehicleType]}</h2>
                  <p className='text-sm '>Cash, cash</p>
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

export default VehiclePanel

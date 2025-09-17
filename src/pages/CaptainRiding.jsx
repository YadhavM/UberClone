import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef ,useState,useEffect} from 'react'
import { Link,useLocation  } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = (props) => {
  const logo = "https://imgs.search.brave.com/Qytw_NXKyFxwwc0vzLr3hbi8hrXtzDbeh_Ziku74uSI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"
  const PanelRef= useRef(null)

  const [FinishRidePanel,setFinishRidePanel] = useState(false)
  const [initialLocation, setInitialLocation] = useState(null)
  const FinishRideRef= useRef(null)

  const location = useLocation()
  const rideData = location.state?.ride
  const Location = location.state?.location

  useGSAP(()=>{
    gsap.to(PanelRef.current,{
      y : 0 , 
      duration : 0.6 , 
      ease: 'power2.out',
    })
  },[])

   useGSAP(()=>{
  if(FinishRidePanel){
    gsap.to(FinishRideRef.current, {
      transform : 'translateY(0)',
      duration: 0.6,
      ease: 'power2.out',
  })
  }else { 
    gsap.to(FinishRideRef.current, {
      transform : 'translateY(100%)',
      duration: 0.6,
      ease: 'power2.out',
      delay : 0.1, 
  })
  setFinishRidePanel(false)
  }
},[FinishRidePanel])


  useEffect(() => {
    const getInitialLocation = async () => {
      try {
        if (Location && Location.lat && Location.lon) {
          setInitialLocation(Location)
        }
        // Do not set fallback location; just leave initialLocation as null
      } catch (error) {
        console.error('Error accessing location:', error.message)
      }
    }

    getInitialLocation()
  }, [Location])

  

  return (
    <div>
        <img src={logo} alt="" className='w-25 absolute left-5 top-5'/>
        <Link to="/captain-home" className='absolute right-5 top-5 px-4 py-3 bg-white rounded-full '><i className="ri-home-3-line text-xl"></i></Link>
      <div className="h-screen w-screen">
          <div className='z-[20] w-screen h-screen'>
              {initialLocation ? (
                <LiveTracking location={Location} />
              ) : (
                <div className="w-screen h-[80%] flex items-center justify-center">
                    <h1>Loading Map...</h1>
                </div>
              )}
            
          </div>

          <div ref={PanelRef} className='w-full bg-yellow-500 p-6 absolute translate-y-full bottom-0 z-1 flex justify-between rounded-t-2xl' onClick={()=>{setFinishRidePanel(true)}}>
            <div className='w-10 h-1 bg-gray-300 absolute left-[40%] top-2 rounded'></div>
            <h2 className='text-xl font-semibold'>{Math.round(rideData?.distance)} KM's away</h2>
            <button onClick={()=>{setFinishRidePanel(true)}} className='bg-green-500 py-2 px-4 rounded-lg font-semibold text-white'>Complete Ride</button>
          </div>
          
      </div>
      <div className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 rounded-t-2xl" ref={FinishRideRef}>
            <FinishRide 
            rideData={rideData}
            setFinishRidePanel={setFinishRidePanel}
            />
          </div>
      
    </div>
  )
}

export default CaptainRiding

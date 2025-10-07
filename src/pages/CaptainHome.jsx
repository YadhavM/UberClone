import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUpPanel from '../components/ConfirmRidePopUpPanel'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import { DatabaseContext } from '../context/DatabaseContext'
import { Switch } from '@headlessui/react'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

function CaptainHome() {
  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)
  const {apiKey} = useContext(DatabaseContext)

  const logo = "https://imgs.search.brave.com/Qytw_NXKyFxwwc0vzLr3hbi8hrXtzDbeh_Ziku74uSI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"

  const [RidePopUpPanel, setRidePopUpPanel] = useState(false)
  const [ConfirmRidePopUp, setConfirmRidePopUp] = useState(false)
  const [ride, setRide] = useState(null)
  const [location, setLocation] = useState({})
  const [Online, setOnline] = useState(false)
  const [loading , setLoading] = useState(false)

  const RidePopUpPanelRef = useRef(null)
  const ConfirmRidePopUpRef = useRef(null)

  //useEffect

  useEffect(() => {
  // Emit join event
  socket.emit('join', {
    userId: captain._id,
    userType: 'captain',
  })

  const getPositionAsync = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        maximumAge: 0,
      })
    })
  }

  const updateLocation = async () => {
    try {
      const position = await getPositionAsync()
      const loc = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }

      socket.emit('update-location-captain', {
        userId: captain._id,
        location: loc,
      })

      setLocation(loc)
    } catch (error) {
      console.error('Error getting location:', error.message)
    }
  }

  updateLocation() // Initial call
  const locationInterval = setInterval(updateLocation, 10000)

  return () => clearInterval(locationInterval)
  }, [socket, captain._id])

 useEffect(() => {
    const handleNewRide = (data) => {
      setRide(data)
      setRidePopUpPanel(true)
    }
    socket.on('new-ride', handleNewRide)
    return () => socket.off('new-ride', handleNewRide)
  }, [socket])

  useEffect(()=>{
    const currentStatus = getCurrentStatus()
  },[])


  // GSAP
  useGSAP(() => {
    if (RidePopUpPanel) {
      gsap.to(RidePopUpPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.6,
        ease: 'power2.out',
      })
    } else {
      gsap.to(RidePopUpPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.1,
      })
      setRidePopUpPanel(false)
    }
  }, [RidePopUpPanel])

  useGSAP(() => {
    if (ConfirmRidePopUp) {
      gsap.to(ConfirmRidePopUpRef.current, {
        transform: 'translateY(0)',
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
    } else {
      gsap.to(ConfirmRidePopUpRef.current, {
        transform: 'translateY(100%)',
        duration: 0.6,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.1,
      })
      setConfirmRidePopUp(false)
    }
  }, [ConfirmRidePopUp])



  async function toggleStatus(next) {

    setLoading(true)
    const response = await axios.post(
      `${apiKey}/captains/toggle-status`,
      { status: next ? 'active' : 'inactive' },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );

    if(response) { 
      setLoading(false)
    }
    return response.data;

  }

  async function getCurrentStatus() {
    const currentStatus = await axios.get(`${apiKey}/captains/get-current-status`,{
      headers : {Authorization  : `Bearer ${localStorage.getItem('token')}`}
    })
    setOnline(currentStatus.data.status === 'active')
  }

  async function confirmRide() {
    try {
      await axios.post(`${apiKey}/rides/confirm`, {
        rideId: ride._id,
        captainId: captain._id
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    } catch (error) {
      console.error(error)
      throw new Error("Unable to get response")
    }
  }

  return (
    <div className="relative h-screen w-screen">

      {/* Logo and logout */}
      <img src={logo} alt="" className="w-25 absolute left-5 top-5 z-20" />
      <div className='absolute flex right-5 top-5  bg-white rounded-full z-20 py-3 px-5 gap-6 items-center'>
          <h3 className='font-semibold text-base'>{Online ? "Online" : "Offline"}</h3>
          <div className=''>
            
              <Switch
                checked={Online}
                onChange={async (next) => {
                  try {
                    const data = await toggleStatus(next); // returns canonical status string
                    // Map enum -> boolean
                    setOnline(data.status === 'active');
                  } catch {
                    // On failure, keep previous value (no flip), or show an error
                    // Optionally, revert UI if you optimistically updated earlier
                  }
                }}
                className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition data-checked:bg-green-400"
              >
                <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
              </Switch>
              
          </div>
          <Link to="/captain-logout" className=''>
          <i className="text-xl font-semibold ri-logout-box-r-line"></i>
          </Link>
      </div>

      {/* Map */}
      <div className="relative w-full h-3/5 z-0">
        {
          location ? (
            <LiveTracking location={location.lat ? location : { lat: 11.137547, lon: 75.890067 }} />
          ) : (
            <div className="w-screen h-[60%] flex items-center justify-center">
                            <h1>Loading Map...</h1>
                        </div>
          )
        }
      </div>

      {/* Bottom panel */}
      <div className="w-full h-2/5 bg-white z-10 shadow-md p-4 relative">
        <CaptainDetails />
      </div>

      {/* Ride PopUp */}
      <div ref={RidePopUpPanelRef} className="fixed w-full bottom-0 translate-y-full rounded-xl bg-white pt-4 z-30">
        <RidePopUp 
          ride={ride}
          confirmRide={confirmRide}
          setRidePopUpPanel={setRidePopUpPanel} 
          setConfirmRidePopUp={setConfirmRidePopUp}
        />
      </div>

      {/* Confirm Ride PopUp */}
      <div ref={ConfirmRidePopUpRef} className="fixed w-full bottom-0 translate-y-full rounded-xl bg-white pt-5 z-30">
        <ConfirmRidePopUpPanel 
          ride={ride}
          Location={location}
          setConfirmRidePopUp={setConfirmRidePopUp} 
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>

      {loading && (
            <div className="fixed h-screen w-screen top-0 flex items-center justify-center z-50 transparent-bg text-black">
              
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              
            </div>
          )}

    </div>
  )
}

export default CaptainHome

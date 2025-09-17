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

  const RidePopUpPanelRef = useRef(null)
  const ConfirmRidePopUpRef = useRef(null)

  // Join socket room & update captain location
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

  // GSAP animations for RidePopUp
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

  // GSAP animations for ConfirmRidePopUp
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

  // Listen for new rides
  useEffect(() => {
    const handleNewRide = (data) => {
      setRide(data)
      setRidePopUpPanel(true)
    }
    socket.on('new-ride', handleNewRide)
    return () => socket.off('new-ride', handleNewRide)
  }, [socket])

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
      <Link to="/captain-logout" className='absolute right-5 top-5 px-4 py-3 bg-white rounded-full z-20'>
        <i className="text-xl font-semibold ri-logout-box-r-line"></i>
      </Link>

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

    </div>
  )
}

export default CaptainHome

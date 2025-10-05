import React, { useState, useRef, useEffect,useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDrag } from "@use-gesture/react";
import { Link, useNavigate } from "react-router-dom";
import LocationSearchPanel from "../components/LocationSearchPanel";
import LookingForDriver from "../components/LookingForDriver";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import VehiclePanel from "../components/VehiclePanel";
import { SocketContext } from "../context/SocketContext";
import {UserDataContext} from '../context/UserContext'
import Map from '../components/Map'
import { DatabaseContext } from "../context/DatabaseContext";
import UberGoImage from '../images/download.png'
import UberVanImage from '../images/premium.png'

function Home() {
  const logo =
    "https://imgs.search.brave.com/Qytw_NXKyFxwwc0vzLr3hbi8hrXtzDbeh_Ziku74uSI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n";

    const {socket} = useContext(SocketContext)
    const {user} = useContext(UserDataContext)
    const {apiKey} = useContext(DatabaseContext)
    
    const navigate = useNavigate()
  // states
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [pickstart, setPickStart] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [LookingForDriverPanel, setLookingForDriverPanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleImage, setVehicleImage] = useState("");
  const [WaitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState("pickup");
  const [fare,setFare] = useState({})
  const [vehicleType , setVehicleType] = useState(null)
  const [Ride , setRide] = useState(null)
  const [locationState, setLocationState] = useState(null)
  const [loading , setLoading] = useState(false)
  const [NoDriverFound, setNoDriverFound] = useState(false)
  const [Errors,setErrors] = useState("")
  const [LocationPicked , setLocationPicked] = useState(false)

  // refs
  const bottomPanelRef = useRef(null);
  const panelRef = useRef(null);
  const pickupRef = useRef(null);
  const destinationRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const LookingForDriverPanelRef = useRef(null);
  const WaitingForDriverPanelRef = useRef(null);
  const panelButtonRef = useRef(null);

  // Abort controller ref for cancelling requests
  const controllerRef = useRef(null);
  // timer ref used by debounce utility created below
  const debounceTimerRef = useRef(null);

  // images
  const UberMotoImage =
    "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/96091ab3-c266-472a-99b5-b78dda3b50cd.png";
  const UberAutoImage =
    "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/474bbf7d-56af-4649-9f19-cfadc1a2e696.png";



  const submitHandler = (e) => {
    e.preventDefault();
  };

  // GSAP
  useGSAP(() => {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(panelButtonRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: 0,
          delay: 0.1,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(panelButtonRef.current, {
          opacity: 0,
        });
        setPickStart(false);
      }
    },
    [panelOpen]
  );
  useGSAP(
    () => {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
        });
      }
    },
    [vehiclePanel]
  );
  useGSAP(
    () => {
      if (LookingForDriverPanel) {
        setVehiclePanel(false);
        gsap.to(LookingForDriverPanelRef.current, {
          transform: "translateY(0)",
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        gsap.to(LookingForDriverPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
        });
      }
    },
    [LookingForDriverPanel]
  );
  useGSAP(
    () => {
      if (confirmRidePanel) {
        setVehiclePanel(false);
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
        });
      }
    },
    [confirmRidePanel]
  );
  useGSAP(
    () => {
      if (WaitingForDriverPanel) {
        setLookingForDriverPanel(false);
        gsap.to(WaitingForDriverPanelRef.current, {
          transform: "translateY(0)",
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        gsap.to(WaitingForDriverPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
        });
      }
    },
    [WaitingForDriverPanel]
  );

  //useEffects
useEffect(()=>{
    if(!user) {
      return
    }
    socket.emit('join' , {
      userType : "user" , 
      userId : user._id
    })
},[user]) 

useEffect(() => {
  const getPositionAsync = () => {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        maximumAge: 0,
      })
    )
  }

  const fetchLocation = async () => {
    try {
      const position = await getPositionAsync()
      setLocationState({
        lat : position.coords.latitude,
        lon : position.coords.longitude
      })
      
    } catch (error) {
      console.error('Error getting location:', error)
    }
  }
  fetchLocation() // Initial fetch

  const intervalId = setInterval(fetchLocation, 5000) // Repeat every 5s

  return () => clearInterval(intervalId) // Clean up on unmount
}, [])

useEffect(()=>{
  const handleRideStart = (ride)=>{
    setRide(ride);
    setWaitingForDriverPanel(false);
    navigate('/riding', {state : {ride : ride , locationState}});
  }

  socket.on('ride-started' , ride => handleRideStart(ride))

  return () => {
            socket.off('ride-started', handleRideStart);
        };
}, [socket, navigate,locationState])

useEffect(()=>{
  const handleRideConfirmed = (ride)=>{
    setLookingForDriverPanel(false)
    setWaitingForDriverPanel(true)
    setRide(ride)
  }
  socket.on('ride-confirmed' , ride =>handleRideConfirmed(ride))

  return () => {
            socket.off('ride-confirmed', handleRideConfirmed);
        }; 
},[socket,navigate])

useEffect(() => {
    if (!LookingForDriverPanel) return;

    const id = setTimeout(() => {
      if (LookingForDriverPanel) {
        setNoDriverFound(true)
      }
    }, 15000);

    return () => clearTimeout(id);
},[LookingForDriverPanel]);

 useEffect(()=>{
  setLocationPicked(LocationPicked)
  },[LocationPicked])

  

  // BINDS
  const bind = useDrag(
    ({ movement: [, my], last }) => {
      const targetRef = vehiclePanelRef; // 👈 use correct ref

      if (targetRef?.current) {
        const clampedY = Math.max(0, my);

        if (!last) {
          gsap.set(targetRef.current, { y: clampedY });
        } else {
          if (clampedY > 80) {
            gsap.to(targetRef.current, {
              y: "100%",
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                if (vehiclePanel) {
                  setVehiclePanel(false);
                }
              },
            });
          } else {
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

  const bind2 = useDrag(
    ({ movement: [, my], last }) => {
      const targetRef = bottomPanelRef;

      if (targetRef?.current) {
        const clampedY = Math.max(0, my);

        if (!last) {
          gsap.set(targetRef.current, { y: clampedY });
        } else {
          if (clampedY > 100) {
            setPanelOpen(false);
            gsap.to(targetRef.current, {
              delay: 0.1,
              y: 0,
            });
          } else {
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

  // get suggestions — cancels previous requests and updates suggestions
  async function getSuggestions(address) {
    if (!address || address.trim() === "") {
      setSuggestions([]);
      return;
    }
    

    // abort previous request if any
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    try {
      const response = await axios.get(
        `${apiKey}/maps/get-suggestions`,
        {
          params: { address },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal: controllerRef.current.signal,
        }
      );

      if (response.status === 200) {
        setSuggestions(Array.isArray(response.data.features) ? response.data.features : []);
        
      } else {
        // non-200
        setSuggestions([]);
        console.error("getSuggestions non-200", response.status);
      }
    } catch (error) {
      // canceled?
      if (error?.code === "ERR_CANCELED") {
        return;
      }
      console.error("getSuggestions error:", error);
      setSuggestions([]);
    }
  }

  // simple debounce utility using ref so the debounced function is stable
  function debounce(fn, delay = 200) {
    return (...args) => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => fn(...args), delay);
    };
  }

  const debouncedGetSuggestions = useRef(debounce((v) => getSuggestions(v), 200)).current;

  // ensure we clean up timers and controllers on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      controllerRef.current?.abort();
    };
  }, []);


  async function findTrip() {

    setLoading(true)

    if(!LocationPicked) { 
      setErrors("Select a location from the suggestions")
      setLoading(false)
      return
    }
    
    try { 
      const response = await axios.get(`${apiKey}/rides/get-fare`,{
      params :{
        pickup , 
        destination
      },
      headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
      })
      setFare(response.data)
      setLoading(false)
      setPanelOpen(false);
      setVehiclePanel(true);
    }catch(error) { 
      setLoading(false)
      setErrors("Unable to Fetch Locations")
      const errors = error.response.data?.errors[0]
      
      setErrors(errors)
      
    }
  }


  async function createRide(){
    const response = await axios.post(
      `${apiKey}/rides/create`,
      {
        pickup,
        destination,
        vehicleType
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

  }



  return (
    <div className="h-screen relative overflow-hidden">

      <img src={logo} alt="" className="w-25 absolute left-5 top-5" />

      <button
        onClick={()=>{
          navigate('/user-logout')
        }}
        className="absolute right-5 top-5 px-4 py-3 bg-white rounded-full z-3 "
      >
        <i className="text-xl font-semibold ri-logout-box-r-line"></i>
      </button>

      {/* Background image */}
      <div className="h-screen w-screen z-[-10] touch-auto">
      {locationState ? (
        <Map center={locationState} />
      ) : (
        <div className="w-screen h-[70%] flex items-center justify-center">
          <h1>Loading Map...</h1>
        </div>
      )}
    </div>

      {/* Panels */}
      <div
        className=" h-screen absolute bottom-0 w-full flex flex-col justify-end touch-none "
        ref={bottomPanelRef}
        {...(panelOpen ? bind2() : {})}
      >
        {/* Bottom panel */}
        <div className="h-[30%] bg-white rounded-t-2xl  relative p-5 touch-none py-4">
          {panelOpen ? (
            <div className=" line2 absolute w-10 top-1/21 h-1 bg-gray-300 left-[43%] rounded-sm mb-4"></div>
          ) : null}

          
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className=" line absolute h-16 flex w-2 flex-col top-22 left-10">
              <div className="bg-black w-2 h-3 mb-1 rounded-[50%]"></div>
              <div className=" w-1 h-15 bg-black rounded ml-0.5"></div>
              <div className="bg-black w-2 h-3  mt-1"></div>
            </div>

            <div className="">

              <input
              type="text"
              ref={pickupRef}
              placeholder="Add a pickup location"
              value={pickup}
              onClick={() => {
                setPanelOpen(true);
                setActiveInput("pickup");
                setSuggestions([]);
                setErrors('')
              }}
              onChange={(e) => {
                setPickup(e.target.value);
                debouncedGetSuggestions(e.target.value);
                setErrors('')
              }}
              onMouseDown={(e) => {
                if (!pickstart) {
                  e.preventDefault();
                  setPickStart(!pickstart);
                }
              }}
              className="bg-[#eeeeee] w-full px-12 py-2 rounded-lg text-base mb-3 mt-5 focus:outline-none"
            />
            <i className={`ri-close-fill absolute z-10 top-20 right-[10%] ${panelOpen ? '' : 'hidden'}`} onClick={()=>setPickup('')}></i>
            </div>

            <div className="">
                <input
                type="text"
                ref={destinationRef}
                placeholder="Set Destination"
                value={destination}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveInput("destination");
                  setSuggestions([]);
                  setErrors('')
                }}
                onChange={(e) => {
                  setDestination(e.target.value);
                  debouncedGetSuggestions(e.target.value);
                  setErrors('')
                }}
                onMouseDown={(e) => {
                  if (!pickstart) {
                    e.preventDefault();
                    setPickStart(!pickstart);
                  }
                }}
                className="bg-[#eeeeee] w-full px-12 py-2 rounded-lg text-base focus:outline-none"
              />
              <i className={`ri-close-fill absolute z-10 top-35 right-[10%] ${panelOpen ? '' : 'hidden'}`} onClick={()=>setDestination('')}></i>
            </div>

          
          <div>
            {
            Errors ?(
              <div className="flex w-full items-center justify-center m-2 text-red-500">
                <p>{Errors.msg ? Errors.msg : Errors}</p>
              </div>
            ) : ''
          }
          </div>

            <button
              type="button"
              ref={panelButtonRef}
              className="bg-black w-full opacity-0 text-white py-2 mt-2 rounded-lg font-semibold"
              onClick={findTrip}
            >
              Find Trip
            </button>
            
          </form>
        </div>

        {/* Location Panel (hidden until gsap opens it) */}
        <div className="h-[0] bg-white opacity-0 px-8" ref={panelRef}>
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            activeInput={activeInput}
            setPickup={setPickup}
            setDestination={setDestination}
            setLocationPicked={setLocationPicked}
          />
        </div>

        {/* Vehicles panel */}
        <div className="fixed z-10 bottom-0 h-[65%] pt-4 bg-white w-full flex flex-col px-2 translate-y-full rounded-t-2xl overflow-y-scroll overflow-hidden scrollbar-hide"
          ref={vehiclePanelRef} >
            <VehiclePanel 
            fare={fare}
            setVehicleType={setVehicleType}
            selectVehicle={setVehicleType}
            setVehicleImage={setVehicleImage}
            setConfirmRidePanel={setConfirmRidePanel}
            />
        </div>

        {/* Confirm / Looking / Waiting panels (kept) */}
        <div
          ref={confirmRidePanelRef}
          className="fixed z-12 bottom-0 bg-white translate-y-full h-[70%] pt-4 w-full flex flex-col  rounded-t-2xl "
        >
          <ConfirmRide
            createRide={createRide}
            pickup={pickup}
            fare={fare}
            vehicleType={vehicleType}
            destination={destination}
            vehicleImage={vehicleImage}
            LookingForDriverPanel={LookingForDriverPanel}
            setVehiclePanel={setVehiclePanel}
            confirmRidePanelRef={confirmRidePanelRef}
            confirmRidePanel={confirmRidePanel}
            setLookingForDriverPanel={setLookingForDriverPanel}
            setConfirmRidePanel={setConfirmRidePanel}
          />
        </div>

        <div
          className="fixed z-12 bottom-0 bg-white translate-y-full h-[70%] pt-4 w-full flex flex-col  rounded-t-2xl "
          ref={LookingForDriverPanelRef}
        >
          <LookingForDriver
            vehicleImage={vehicleImage}
            destination={destination}
            pickup={pickup}
            fare={fare}
            vehicleType={vehicleType}
            setConfirmRidePanel={setConfirmRidePanel}
            LookingForDriverPanelRef={LookingForDriverPanelRef}
            setLookingForDriverPanel={setLookingForDriverPanel}
            LookingForDriverPanel={LookingForDriverPanel}
          />
        </div>

        <div
          className="fixed z-12 bottom-0 bg-white translate-y-[200%] h-[70%] pt-4 w-full flex flex-col  rounded-t-2xl "
          ref={WaitingForDriverPanelRef}
        >
          <WaitingForDriver
            vehicleImage={vehicleImage}
            WaitingForDriverPanel={WaitingForDriverPanel}
            WaitingForDriverPanelRef={WaitingForDriverPanelRef}
            ride={Ride}
          />
        </div>
        
        {loading && (
            <div className="fixed h-screen w-screen top-0 flex items-center justify-center z-50 transparent-bg text-black">
              <div className="w-50 h-40 bg-gray-200 rounded-xl flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                <h1 className="mt-4 font-semibold text-sm">Creating Your Ride</h1>
              </div>
            </div>
          )}

          {
            NoDriverFound && (
              <div className="w-full h-full z-20 fixed top-0 left-0 flex items-center justify-center text-black transparent-bg">
                <div className="flex items-center justify-center flex-col p-10 rounded-2xl bg-white gap-5">
                  <h1 className="text-lg ">Sorry, No Driver Available</h1>
                  <button 
                  className="bg-green-700 px-4 py-2 font-semibold text-white rounded-xl" 
                  onClick={()=>{
                    setLookingForDriverPanel(false)
                    setNoDriverFound(false)
                    setDestination("")
                    setPickup("")
                  }}
                  > Go To Home
                  
                  </button>
                </div>
              </div>
            )
          }

        

      </div>
    </div>
  );
}

export default Home;

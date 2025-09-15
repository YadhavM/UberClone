import React,{useEffect , useContext,useState} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {SocketContext} from '../context/SocketContext'
import Map from '../components/Map'

const Riding = () => {

    const {socket} = useContext(SocketContext)
    const navigate = useNavigate()
    const location = useLocation()
    const ride = location?.state.ride 
    const Location = location.state?.locationState
    const logo = "https://imgs.search.brave.com/Qytw_NXKyFxwwc0vzLr3hbi8hrXtzDbeh_Ziku74uSI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"
    
     useEffect(() => {
        const handleRideEnded = () => {
            navigate('/home');
        };

        socket.on('ride-ended', handleRideEnded);

        
        return () => {
            socket.off('ride-ended', handleRideEnded);
        };
    }, [socket, navigate]);

 return (
    <div className='overflow-hidden'>
        <img src={logo} alt="" className='w-25 absolute left-5 top-5'/>
        <Link to="/home" className='absolute right-5 top-5 px-4 py-3 bg-white rounded-full '><i className="ri-home-3-line text-xl"></i></Link>
      <div className="h-screen w-screen ">
         
            <div className='w-screen h-1/2 z-[-10]'>
                {
                    Location ? (
                        <Map center={Location}/>
                    ) : (
                        <h1>Loading Map...</h1>
                    )
                }
            </div>
            
          <div className='w-full h-1/2'>
                    <div className="w-full px-10 py-2  flex flex-row items-center justify-between">
                        <div>
                            <img className="w-25" src="https://imgs.search.brave.com/TKzcq4TXbGqQUdpiEcg9FgywtpYVK37LZka0tX-8t24/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjkv/OTQ2LzIwMS9zbWFs/bC93aGl0ZS1tb2Rl/cm4tY2FyLWlzb2xh/dGVkLW9uLXRyYW5z/cGFyZW50LWJhY2tn/cm91bmQtM2QtcmVu/ZGVyaW5nLWlsbHVz/dHJhdGlvbi1mcmVl/LXBuZy5wbmc" alt="" />
                        </div>
                        <div className='flex flex-col text-right'>
                            <h2 className='text-lg font-medium '>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
                            <h4 className='text-xl font-semibold'>{ride?.captain.vehicle.plate ?? '--'}</h4>
                            <p className='text-gray-400 text-sm'>{ride?.captain.vehicle.vehicleType ?? '--'}</p>
                        </div>
                    
                    </div>

                    <div className='overflow-hidden overflow-y-scroll'>
                        <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
                            <div className='w-9 flex items-center justify-center'>
                                <h2 className=' text-2xl'><i className="ri-map-pin-2-fill"></i></h2>
                            </div>
                                <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                                <h2 className='text-lg font-semibold'>Destination</h2>
                                <p className='text-sm max-h-10 overflow-y-scroll scrollbar-hide'>{ride?.destination}</p>
                                </div>
                        </div>

                        <div className='w-full py-2 flex flex-row items-center pl-4 gap-5 '>
                            <div className='w-9 flex items-center justify-center'>
                                <h2 className=' text-2xl'><i className="ri-money-rupee-circle-fill"></i></h2>
                            </div>
                            <div className=' w-full pb-4 border-b-3  border-b-gray-200 '>
                                <h2 className='text-lg font-semibold'>$ {ride?.fare}</h2>
                                <p className='text-sm'>Cash Cash</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-15 flex items-center justify-center'>
                        <button className='px-2 py-2 bg-green-700 text-white font-semibold rounded '>Make a payment</button>
                    </div>
                    
          </div>
      </div>
      
    </div>
  )
}

export default Riding

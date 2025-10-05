import React, { useState ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {CaptainDataContext } from '../context/CaptainContext'
import { DatabaseContext } from '../context/DatabaseContext';
import axios from 'axios';
function CaptainLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading ,setLoading] = useState(false)
  const {captain,setCaptain} = useContext(CaptainDataContext) ;
  const {apiKey} = useContext(DatabaseContext)
  const [errors,setErrors] = useState(null)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true)

    try { 
      const loginData = { email, password };

    const response = await axios.post(`${apiKey}/captains/login`, loginData);

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      setLoading(false)
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setEmail('');
    setPassword('');
    }catch(error) { 
      
        const errors = error.response.data
        setLoading(false)
        errors.message ? setErrors(errors.message) : setErrors(errors.errors[0].msg)
      
    }
  };

  const logoUrl = 'https://imgs.search.brave.com/Xr5AE-qF9u_eA3dArDHLnzd2OmEM7V44OSXOCtcAsuk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1OTc2MTQy/NXViZXItZHJpdmVy/LWxvZ28tcG5nLnBu/Zw';

  return (
    <div className='p-7 pb-20 flex h-screen flex-col justify-between'>

      <div>
        <img src={logoUrl} alt="" className='w-15 mb-5' />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg mb-2">Whats Your Email? </h3>
          <input 
            type="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com" 
            required
            className='rounded bg-[#eeeeee] px-4 py-2 mb-3 w-full text-lg placeholder:text-base   focus:outline-none'
          />
          <h3 className='text-lg mb-2'>Enter Your Password</h3>
          <input 
            type="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder='password'
            className='rounded bg-[#eeeeee] w-full px-4 py-2 text-lg placeholder:text-base mb-10 focus:outline-none'
          />
            {
                  errors ? (
                    <div className="w-full items-center justify-center flex mb-3 text-red-500 text-center">
                      <p className='items-center justify-center'>{errors}</p>
                    </div>
                  ) : ''
              }
          <button className='bg-[#111] text-[#fff] font-semibold w-full py-2 px-4 rounded mb-2'>Login as Captain</button>
          <p className='text-center'>Join a Fleet? <Link to="/captain-signup" className='text-blue-600'>Register as a Captain</Link></p>
        </form>
      </div>

      <div>
        <Link to="/login" className='w-full flex justify-center bg-[#4A6C6F] py-3 px-4 text-white rounded font-semibold'>
          Sign in to Uber
        </Link>
      </div>

      <div className="fixed left-0 top-0">
        {loading && (
            <div className="fixed h-screen w-screen top-0 flex items-center justify-center z-50 transparent-bg text-black">
              <div className="w-50 h-40 bg-gray-200 rounded-xl flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            </div>
          )}
      </div>

    </div>
  );
}

export default CaptainLogin;

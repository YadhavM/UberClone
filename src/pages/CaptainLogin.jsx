import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios';
function CaptainLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {captain,setCaptain} = React.useContext(CaptainDataContext) ;

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, loginData);

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setEmail('');
    setPassword('');
  };

  const logoUrl = 'https://imgs.search.brave.com/Xr5AE-qF9u_eA3dArDHLnzd2OmEM7V44OSXOCtcAsuk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1OTc2MTQy/NXViZXItZHJpdmVy/LWxvZ28tcG5nLnBu/Zw';

  return (
    <div className='p-7 flex h-screen flex-col justify-between'>
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
            className='rounded bg-[#eeeeee] px-4 py-2 mb-3 w-full text-lg placeholder:text-base  focus:outline-none'
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
          <button className='bg-[#111] text-[#fff] font-semibold w-full py-2 px-4 rounded mb-2'>Login as Captain</button>
          <p className='text-center'>Join a Fleet? <Link to="/captain-signup" className='text-blue-600'>Register as a Captain</Link></p>
        </form>
      </div>
      <div>
        <Link to="/login" className='w-full flex justify-center bg-[#4A6C6F] py-3 px-4 text-white rounded font-semibold'>
          Sign in to Uber
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin;

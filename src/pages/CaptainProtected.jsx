import React,{useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {CaptainDataContext} from '../context/CaptainContext';
function UserProtected({children}) {
    const navigate = useNavigate() ; 
    const {captain , setCaptain} = useContext(CaptainDataContext) ;
    const [loading , setLoading] = useState(true) ;
    useEffect(()=>{
        const token = localStorage.getItem('token') ;
        if(!token){
                navigate("/captain-login") ; 
                
        }}
    )
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
        headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response=>{
        if(response.status == 200) { 
            setCaptain(response.data.captain) ;
            setLoading(false) ;
        }
    }).catch(err=>{
        localStorage.removeItem('token') ;
        navigate("/captain-login") ;
    })

    if(loading){
        return (
            <div className="">Loading...</div>
        )
    }
    return(
        <>
        {children}
        </>
    )
        
}

export default UserProtected

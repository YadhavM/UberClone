import React,{useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {CaptainDataContext} from '../context/CaptainContext';
import { DatabaseContext } from '../context/DatabaseContext'
function UserProtected({children}) {
    const navigate = useNavigate() ; 
    const {captain , setCaptain} = useContext(CaptainDataContext) ;
    const {apiKey} = useContext(DatabaseContext)
    const [loading , setLoading] = useState(true) ;
    useEffect(()=>{
        const token = localStorage.getItem('token') ;
        if(!token){
                navigate("/captain-login") ; 
                
        }}
    )
    axios.get(`${apiKey}/captains/profile`,{
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
            <div className="h-screen w-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        )
    }
    return(
        <>
        {children}
        </>
    )
        
}

export default UserProtected

import React,{useContext, useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext';
import axios from 'axios';
function UserProtected({children}) {
    const navigate = useNavigate() ; 
    const {user , setUser} = useContext(UserDataContext) ;
    const [loading , setLoading] = useState(true) ;
    useEffect(()=>{
        const token = localStorage.getItem('token') ;
        if(!token){
                navigate("/login") ; 
        }}
    )

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
        headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response=>{
        if(response.status === 200){
            setUser(response.data) ;
            setLoading(false) ;
        }
    }).catch(err=>{
        localStorage.removeItem('token') ;
        navigate("/login") ;
    })

    if(loading){
        return (
            <div className="">Loading...</div>
        )
    }
    return(
        <div>
        {children}
        </div>
    )
        
}

export default UserProtected

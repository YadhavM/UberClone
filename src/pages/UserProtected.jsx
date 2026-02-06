import React,{useContext, useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext';
import { DatabaseContext } from '../context/DatabaseContext';
import axios from 'axios';
function UserProtected({children}) {
    const navigate = useNavigate() ; 
    const {user , setUser} = useContext(UserDataContext) ;
    const {Key} = useContext(DatabaseContext)
    const [loading , setLoading] = useState(true) ;
    useEffect(()=>{
        const token = localStorage.getItem('token') ;
        if(!token){
                navigate("/login") ; 
        }}
    )

    axios.get(`${Key}/users/profile`,{
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
            <div className="h-screen w-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        )
    }
    return(
        <div>
        {children}
        </div>
    )
        
}

export default UserProtected

import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { DatabaseContext } from '../context/DatabaseContext';
function Userlogout() {
    const {Key} = useContext(DatabaseContext)
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    axios.get(`${Key}/users/logout`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{

        if(response.status === 200){
            localStorage.removeItem('token');
            navigate('/login') ;
        }

    })
  return (
    <div>
      
    </div>
  )
}

export default Userlogout

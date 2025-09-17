import React,{useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { DatabaseContext } from '../context/DatabaseContext';
function CaptainLogout() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const {apiKey} = useContext(DatabaseContext)

    axios.get(`${apiKey}/captains/logout`, {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            localStorage.removeItem('token');
            navigate('/captain-login') ;
        }
    })
  return (
    <div>
      
    </div>
  )
}

export default CaptainLogout

import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { DatabaseContext } from "./DatabaseContext";
export const SocketContext = createContext()




const SocketProvider = ({ children }) => {

  const {apiKey} = useContext(DatabaseContext)
  const socket = io(`${apiKey}`)
  useEffect(()=>{
    socket.on('connect', ()=>{
    })
    
    socket.on('disconnect',()=>{
    })
    return ()=>{
        socket.disconnect()
    }
  },[])

  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

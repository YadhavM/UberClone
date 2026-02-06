import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import SocketProvider from './context/SocketContext.jsx'
import {DatabaseProvider} from './context/DatabaseContext.jsx'

createRoot(document.getElementById('root')).render(
  <DatabaseProvider>
      <CaptainContext>
      <UserContext>
        <SocketProvider>
          <BrowserRouter basename="/UberClone/">
            <App />
          </BrowserRouter>
        </SocketProvider>
      </UserContext>
    </CaptainContext>
  </DatabaseProvider>
  
)

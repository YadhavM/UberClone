import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Recenter map when location changes
const RecenterMap = ({ lat, lon }) => {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lon])
  }, [lat, lon, map])
  return null
}

const LiveTracking = ({ location }) => {
  const [currentLocation, setCurrentLocation] = useState(location)

  useEffect(() => {
    const getPositionAsync = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          maximumAge: 0,
        })
      })
    }

    const updateLocation = async () => {
      if (navigator.geolocation) {
        try {
          const position = await getPositionAsync()
          setCurrentLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        } catch (error) {
          console.error('Error getting location:', error.message)
        }
      }
    }

    updateLocation() // Initial fetch
    const intervalId = setInterval(updateLocation, 5000) // Repeated every 5 seconds

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[currentLocation.lat, currentLocation.lon]}
        zoom={18}
        style={{ width: '100%', height: '100%', zIndex: -10 }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={[currentLocation.lat, currentLocation.lon]}>
          <Popup>Current Location</Popup>
        </Marker>
        <RecenterMap lat={currentLocation.lat} lon={currentLocation.lon} />
      </MapContainer>
    </div>
  )
}

export default LiveTracking

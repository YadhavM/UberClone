import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'


delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})


const RecenterMap = ({ center }) => {
  const map = useMap()
  useEffect(() => {
    map.setView([center.lat, center.lon], map.getZoom())
  }, [center, map])

  return null
}

const Map = ({ center, zoom = 18 }) => {
  return (
    <MapContainer
      center={[center.lat, center.lon]}
      zoom={zoom}
      style={{ width: '100%', height: '100%', zIndex: -10 }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <RecenterMap center={center} />

      <Marker position={[center.lat, center.lon]}>
      </Marker>
    </MapContainer>
  )
}

export default Map

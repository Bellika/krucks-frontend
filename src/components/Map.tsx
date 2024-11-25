import React from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"

const Map: React.FC<{ onMapClick: (latlng: { lat: number; lng: number }) => void; markers?: { lat: number; lng: number }[] }> = ({
  onMapClick,
  markers = [],
}) => {
  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        onMapClick(e.latlng)
        console.log(e.latlng)
      },
    })
    return null
  }

  return (
    <div id="map">
    <MapContainer style={{ height: "400px", width: "600px" }} center={[59.3293, 18.0686]} zoom={7}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, idx) => (
        <Marker key={idx} position={marker} />
      ))}
      <ClickHandler />
    </MapContainer>
    </div>
  )
}

export default Map
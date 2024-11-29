import React from "react"
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet"
interface MapProps {
  onMapClick?: (latlng: { lat: number; lng: number }) => void
  markers?: { lat: number; lng: number; popupContent?: string }[]
  center?: [number, number]
  zoom?: number
}

const Map: React.FC<MapProps> = ({
  onMapClick,
  markers = [],
  center = [59.3293, 18.0686],
  zoom = 7,
}) => { 
  
  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        if (onMapClick) {
          onMapClick(e.latlng)
          console.log(e.latlng)
        }
      },
    })
    return null
  }

  return (
    <div id="map">
      <MapContainer style={{ height: "400px", width: "600px" }} center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={[marker.lat, marker.lng]}>
            {marker.popupContent && <Popup>{marker.popupContent}</Popup>}
          </Marker>
        ))}
        {onMapClick && <ClickHandler />}
      </MapContainer>
    </div>
  );
};

export default Map
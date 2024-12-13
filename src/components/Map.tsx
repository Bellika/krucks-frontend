import React from "react"
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet"
import { Link, useLocation } from "react-router-dom";
interface MapProps {
  onMapClick?: (latlng: { lat: number; lng: number }) => void
  markers?: {
    crag?: { _id: string; name: string };
    boulder?: { _id: string; name: string };
    lat: number;
    lng: number;
    popupContent?: string
  }[]
  center?: [number, number]
  zoom?: number
}

const Map: React.FC<MapProps> = ({
  onMapClick,
  markers = [],
  center = [59.3293, 18.0686],
  zoom = 7,
}) => {

  const location = useLocation()

  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        if (onMapClick) {
          onMapClick(e.latlng)
        }
      },
    })
    return null
  }

  const getLinkPath = (marker: { crag?: { _id: string }; boulder?: { _id: string } }) => {
    if (location.pathname === '/crags' && marker.crag) {
      console.log("Generated link path:", location.pathname);
      return `/crag/${marker.crag._id}`
    }
    if (location.pathname.startsWith('/crag') && marker.boulder) {
      console.log("Generated link path:", location.pathname);
      return `/boulder/${marker.boulder._id}`
    }
    console.log("Generated link path:", location.pathname);
    return '#'
  }

  return (
    <div id="map">
      <MapContainer style={{ height: "400px", width: "600px" }} center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={[marker.lng, marker.lat]}>
            {marker.popupContent &&
              <Popup>
                <Link
                  to={getLinkPath(marker)}
                  onClick={() => console.log("Link clicked for marker:", marker)}
                >
                  {marker.popupContent}
                </Link>
              </Popup>}
          </Marker>
        ))}
        {onMapClick && <ClickHandler />}
      </MapContainer>
    </div>
  );
};

export default Map
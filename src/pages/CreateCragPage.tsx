import React, { useState } from 'react'
import Map from '../components/Map'
import CreateCragForm from '../components/CreateCragForm';

const CreateCragPage: React.FC = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null)

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    setSelectedCoordinates(latlng)
  }

  const markers = selectedCoordinates
    ? [{
      crag: { _id: 'temp', name: 'New Crag' },
      lat: selectedCoordinates.lng,
      lng: selectedCoordinates.lat,
      popupContent: 'Click to create a new crag'
    }]
    : []

  return (
    <div>
      <h1>Create a Crag</h1>
      <Map 
        markers={markers}
        onMapClick={handleMapClick}
      />
      <CreateCragForm selectedCoordinates={selectedCoordinates}/>
    </div>
  )
}

export default CreateCragPage
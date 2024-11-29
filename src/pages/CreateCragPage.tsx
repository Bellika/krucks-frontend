import React, { useState } from 'react'
import Map from '../components/Map'
import CreateCragForm from '../components/CreateCragForm';

const CreateCragPage: React.FC = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null)

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    setSelectedCoordinates(latlng)
  }

  return (
    <div>
      <h1>Create a Crag</h1>
      <Map 
        markers={selectedCoordinates ? [selectedCoordinates] : []}
        onMapClick={handleMapClick}
      />
      <CreateCragForm selectedCoordinates={selectedCoordinates}/>
    </div>
  )
}

export default CreateCragPage
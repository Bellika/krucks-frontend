import React, { useState } from 'react'
import axios from 'axios'
import Map from './Map'

const CreateCragForm: React.FC = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/crags', {
        name,
        description,
        latitude: latitude,
        longitude: longitude,
      })
      alert('Crag created!')
    } catch (error) {
      console.error('Error creating crag:', error)
    }
  }

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    setLatitude(latlng.lat);
    setLongitude(latlng.lng);
  };

  return (
    <div>
      <div style={{ height: '1000px', width: '1000px' }}>
        <Map onMapClick={handleMapClick} markers={latitude && longitude ? [{ lat: latitude, lng: longitude }] : []} />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Latitude:</label>
          <input value={latitude ?? ''} readOnly/>
        </div>
        <div>
          <label>Longitude:</label>
          <input value={longitude ?? ''} readOnly />
        </div>
        <button type="submit">Create Crag</button>
      </form>
    </div>
  )
}

export default CreateCragForm

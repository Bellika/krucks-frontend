import React, { useState } from 'react'
import axios from 'axios'

interface CreateCragFormProps {
  selectedCoordinates: { lat: number; lng: number } | null
}

const CreateCragForm: React.FC<CreateCragFormProps> = ({ selectedCoordinates }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCoordinates) {
      alert('Please select coordinates on the map!')
      return
    }

    try {
      await axios.post('http://localhost:5000/api/crags', {
        name,
        description,
        latitude: selectedCoordinates.lat,
        longitude: selectedCoordinates.lng
      })
      alert('Crag created!')
    } catch (error) {
      console.error('Error creating crag:', error)
    }
  }

  return (
    <div>
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
          <input value={selectedCoordinates ? selectedCoordinates.lat : ''} readOnly/>
        </div>
        <div>
          <label>Longitude:</label>
          <input value={selectedCoordinates ? selectedCoordinates.lng : ''} readOnly />
        </div>
        <button type="submit">Create Crag</button>
      </form>
    </div>
  )
}

export default CreateCragForm

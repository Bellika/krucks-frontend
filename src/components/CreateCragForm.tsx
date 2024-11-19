import React, { useState } from 'react'
import axios from 'axios'

const CreateCragForm: React.FC = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/crags', {
        name,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      })
      alert('Crag created!')
    } catch (error) {
      console.error('Error creating crag:', error)
    }
  }

  return (
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
        <input value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      </div>
      <div>
        <label>Longitude:</label>
        <input value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      </div>
      <button type="submit">Create Crag</button>
    </form>
  )
}

export default CreateCragForm

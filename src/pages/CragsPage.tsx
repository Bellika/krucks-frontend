import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getCrags } from "../api/cragApi";
import CragsList from "../components/CragsList"
import Map from "../components/Map"
interface Crag {
  _id: string,
  name: string;
  location: {
    type: string,
    coordinates: [number, number]
  }
}

const CragsPage: React.FC = () => {
  const [crags, setCrags] = useState<Crag[]>([])
  const navigate = useNavigate()

  const handleCreateCrag = () => {
    navigate('/create-crag')
  }

  useEffect(() => {
    const fetchCrags = async () => {
      try {
        const cragsData = await getCrags()
        setCrags(cragsData) 
      } catch (error) {
        console.error('Failed to fetch crags', error)
      }
    }

    fetchCrags()
  }, [])

  const markers = crags
  .filter((crag) => crag.location?.coordinates?.length === 2)
  .map((crag) => ({
    crag,
    lat: crag.location.coordinates[0],
    lng: crag.location.coordinates[1],
    popupContent: crag.name,
  }))

  return (
    <div>
      <h1>Crags</h1>
      <button onClick={handleCreateCrag}>Create crag</button>
      <CragsList />
      <Map markers={markers}/>
    </div>
  )
}

export default CragsPage
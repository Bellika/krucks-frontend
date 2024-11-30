import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getCrags } from "../api/cragApi";
import CragList from "../components/CragList"
import Map from "../components/Map"
interface Crag {
  _id: string,
  name: string;
  latitude: number,
  longitude: number,
}

const CragPage: React.FC = () => {
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
  .filter((crag) => crag.latitude !== undefined && crag.longitude !== undefined)
  .map((crag) => ({
    crag,
    lat: crag.latitude,
    lng: crag.longitude,
    popupContent: crag.name,
  }))

  return (
    <div>
      <h1>Crags</h1>
      <button onClick={handleCreateCrag}>Create crag</button>
      <CragList />
      <Map markers={markers}/>
    </div>
  )
}

export default CragPage
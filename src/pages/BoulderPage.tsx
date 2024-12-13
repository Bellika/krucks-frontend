import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { getBoulderById } from "../api/boulderApi";
import Boulder from "../components/Boulder";

interface Boulder {
  _id: string,
  name: string,
  description: string;
  location: { 
    type: string,
    coordinates: [number, number] 
  }
}

const BoulderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [boulder, setBoulder] = useState<Boulder | null>(null)

  useEffect(() => {
    if (!id) {
      console.error('No Boulder ID provided in the URL')
      return
    }

    const fetchBoulder = async () => {
      try {
        const boulderData = await getBoulderById(id)
        setBoulder(boulderData)
      } catch (error) {
        console.error('Failder to fetch boulder data:', error)
      }
    }

    fetchBoulder()
  }, [id])

  if (!boulder) {
    return <div>Boulder not found</div>
  }

  return (
    <div>
    <Boulder
      name={boulder.name}
      description={boulder.description}
      latitude={boulder.location.coordinates[0]}
      longitude={boulder.location.coordinates[1]}
    />
  </div>
  )
}

export default BoulderPage
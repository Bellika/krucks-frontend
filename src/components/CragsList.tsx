import React, { useEffect, useState } from "react";
import { getCrags } from "../api/cragApi";

interface Crag {
  _id: string
  name: string
  description: string
}

const CragList: React.FC = () => {
  const [crags, setCrags] = useState<Crag[]>([])
  const [error, setError] = useState<string>('')
  
  useEffect(() => {
    const fetchCrags = async () => {
      try {
        const cragsData = await getCrags()
        setCrags(cragsData)
      } catch {
        setError('Failed to fetch crags')
      }
    }

    fetchCrags()
  }, [])

  return (
    <div>
      <h1>Crags</h1>
      {error && <p>{error}</p>}
      <ul>
        {crags.map((crag) => (
          <li key={crag._id}>{crag.name}</li>
        ))}
      </ul>
    </div>
  )

}

export default CragList


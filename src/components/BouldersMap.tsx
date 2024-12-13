import React, { useEffect, useState } from "react"
import Map from "./Map"
import { getBouldersByCragId } from "../api/boulderApi"

interface Boulder {
  _id: string
  name: string
  location: { 
    type: string,
    coordinates: [number, number] 
  }
}

interface BouldersMapProps {
  cragId: string
}


const BouldersMap: React.FC<BouldersMapProps> = ({ cragId }) => {
  const [boulders, setBoulders] = useState<Boulder[]>([]);

  useEffect(() => {
    const fetchBoulders = async () => {
      try {
        const response = await getBouldersByCragId(cragId)
        const bouldersData = response
        setBoulders(bouldersData);
      } catch (error) {
        console.error('Failed to fetch boulders', error)
      }
    };

    fetchBoulders();
  }, [cragId]);

  const markers = boulders
  .filter((boulder) => boulder.location?.coordinates?.length === 2)
  .map((boulder) => ({
    boulder: { _id: boulder._id, name: boulder.name },
    lat: boulder.location.coordinates[0],
    lng: boulder.location.coordinates[1],
    popupContent: boulder.name,
  }))

  return (
    <div>
      <h2>Boulders</h2>
      <ul>
        {boulders.map((boulder) => (
          <li key={boulder._id}>{boulder.name}</li>
        ))}
      </ul>
      <Map markers={markers} />
    </div>
  );
};

export default BouldersMap;



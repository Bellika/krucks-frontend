import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCragById } from "../api/cragApi"; 
import Crag from "../components/Crag"; 
import BouldersMap from "../components/BouldersMap";

interface Crag {
  _id: string;
  name: string;
  description: string;
  images: string[];
  location: { 
    type: string,
    coordinates: [number, number] 
  }
}

const CragPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [crag, setCrag] = useState<Crag | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error('No Crag ID provided in the URL')
      setLoading(false)
      return
    }

    const fetchCrag = async () => {
      try {
        const cragData = await getCragById(id);
        setCrag(cragData);
      } catch (error) {
        console.error("Failed to fetch crag data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCrag(); 
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!crag) {
    return <div>Crag not found</div>; 
  }

  return (
    <div>
      <Crag
        name={crag.name}
        description={crag.description}
        latitude={crag.location.coordinates[0]}
        longitude={crag.location.coordinates[1]}
      />
      <BouldersMap cragId={crag._id}/>
    </div>
  );
};

export default CragPage;

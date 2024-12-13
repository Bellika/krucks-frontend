import React from "react";

interface CragProps {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}
const Crag: React.FC<CragProps> = ({
  name,
  description,
  latitude,
  longitude,
}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );
};

export default Crag;

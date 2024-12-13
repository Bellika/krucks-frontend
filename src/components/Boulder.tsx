import React from "react";

interface BoulderProps {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}
const Boulder: React.FC<BoulderProps> = ({
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

export default Boulder;
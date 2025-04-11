import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function LocationDetails({ topics }) {
  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topics.length === 0) return;

    const locationData = topics
      .flatMap((topic) => topic.programs)
      .find((program) => program.location.id === parseInt(locationId));

    if (locationData?.location) {
      setLocation(locationData.location);
    }
    setLoading(false);
  }, [locationId, topics]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className='container col py-3 location'>
      <h2>{location.title}</h2>
      <img
        src={location.cover_image}
        alt={location.title}
        width="600" />
      <br /><br />
      <p>{location.description}</p>
      <p>Address: {location.address}</p>
      <p>Postcode: {location.postcode}</p>
      {location.website && (
        <a href={location.website} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      )}
    </div>
  );
}

export default LocationDetails;
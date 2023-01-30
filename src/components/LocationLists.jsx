import React, { useState, useEffect } from 'react';
import LocationForm from './LocationForm';
import SingleLocation from './SingleLocation';

function LocationLists() {
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);

  //GET
  const getLocations = async () => {
    try {
      const response = await fetch('http://localhost:8000/locations');
      const jsonData = await response.json();

      setLocations(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);
  console.log(locations);
  return (
    <div>
      <LocationForm
        location={location}
        setLocation={setLocation}
        locations={locations}
        setLocations={setLocations} 
      />
      <div>
        {locations.map((location, o_id) => (
          <SingleLocation
            location={location}
            setLocation={setLocation}
            key={o_id}
            locations={locations}
            setLocations={setLocations}
          />
        ))}
      </div>
    </div>
  );
}

export default LocationLists;

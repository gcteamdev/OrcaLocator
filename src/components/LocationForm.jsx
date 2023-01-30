import React from 'react';
//import AddBoxIcon from '@mui/icons-material/AddBox';
import "./LocationForm.css"

function LocationForm({location, setLocation, locations, setLocations}) {
  const handleSubmit = async(e) => {
    e.preventDefault();
    {
      if (location !== '') {
        setLocations([...locations, { description: location }]);
        setLocation('');
      }
    }
    //POST 
    try {
      const body = { description:location };
      const response = await fetch("http://localhost:8000/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Enter Orca pod location you spotted today :)"
        type="text"
        name="description"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
    

     {/*  <div
        className="add-task d-none d-md-block"
        type="submit"
        onClick={() => {
          if (description !== '') {
            setLocations([...locations, { description: description }]);
            setDescription('');
          }
        }}
      >
        <AddBoxIcon />
      </div> */}
    </form>
  );
}

export default LocationForm;

import React, { useState } from 'react';
import { CDBTable, CDBTableHeader, CDBContainer } from 'cdbreact';
import './LocationForm.css';

const SingleLocation = ({
  location,
  setLocation,
  o_id,
  locations,
  setLocations,
}) => {
  const [edit, setEdit] = useState(false);
  const [editLocation, setEditLocation] = useState(location.description);
  //Delete
  const deleteLocation = async (id) => {
    try {
      const deleteLocation = await fetch(
        `http://localhost:8000/locations/${id}`,
        {
          method: 'DELETE',
        }
      );

      setLocations(locations.filter((location) => location.o_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  //Update
  const handleEdit = async (e, id) => {
    e.preventDefault();
    setLocations(
        locations.map((location) =>
          location.o_id === id
            ? { ...locations, description: editLocation }
            : locations
        )
      );
      setEdit(false);
     try {
      const body = { description:editLocation };
      const response =  await fetch(
        `http://localhost:8000/locations/${location.o_id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      window.location = '/';
    } catch (err) {
      console.error(err.message);
    } 
  };
  return (
    <CDBContainer>
      <CDBTable>
        <CDBTableHeader>
          <tr className="bg-light tab-row d-flex justify-content-between">
            <th>
              {location.description}
              {edit ? (
                <form onSubmit={(e) => handleEdit(e, location.o_id)}>
                  <input
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                  />
                </form>
              ) : (
                ''
              )}
            </th>
            <div>
              <th>
                <button
                  className="btn bg-success text-white "
                  onClick={() => {
                    if (!edit) {
                      setEdit(!edit);
                    }
                  }}
                >
                  {' '}
                  Update
                </button>
              </th>
              <th>
                <button
                  className="btn bg-warning text-white "
                  onClick={() => deleteLocation(location.o_id)}
                >
                  Delete
                </button>
              </th>
            </div>
          </tr>
        </CDBTableHeader>
      </CDBTable>
    </CDBContainer>
  );
};
export default SingleLocation;

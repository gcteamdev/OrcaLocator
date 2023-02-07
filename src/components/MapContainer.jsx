import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

const MapContainer = (props) => {
  const [selectedLocation, setSelectedLocation] = useState({ lat: null, lng: null });

  useEffect((e) => {
    const geocoder = new window.google.maps.Geocoder();
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const latlng = { lat, lng };
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                setSelectedLocation({
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                });
              } else {
                console.log("No results found");
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          });
        },
        (error) => console.log(error)
      );
    }
  }, []);

  if (!selectedLocation.lat || !selectedLocation.lng) {
    return <div>Loading...</div>;
  }

  return (
    <Map
      google={props.google}
      zoom={14}
      center={{
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      }}
    >
      <Marker
        position={{
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        }}
        name={"Current Location"}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "Your-api-key",
})(MapContainer);

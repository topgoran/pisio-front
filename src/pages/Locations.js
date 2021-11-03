import React from "react";
import { useState, useEffect } from "react";
import LocationsList from "../components/locations/LocationsList";
import NewLocationForm from "../components/locations/NewLocationForm";

const LOCATIONS_URL = "http://localhost:9000/locations";

const Locations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(LOCATIONS_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLocations(data);
      });
  }, []);

  function addLocation(location) {
    fetch(LOCATIONS_URL, {
      method: "POST",
      body: JSON.stringify(location),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLocations([...locations, data]);
      });
  }

  function deleteLocation(locationId) {
    fetch(LOCATIONS_URL + "/" + locationId, { method: "DELETE", })
      .then((response) => {
          console.log(response)
        if(!response.ok) throw new Error(response.status);
        else return response;
      }).then((data) => {
        setLocations(locations.filter((location) => location.locationId !== locationId));
      }).catch((error) => {        
        alert("Deleting this location is not allowed.");
      });
  }

  function updateLocation(locationId, location) {
    fetch(LOCATIONS_URL + "/" + locationId, {
      method: "PUT",
      body: JSON.stringify(location),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let index = locations.findIndex(x=> x.locationId === locationId);

        let oldLocations = locations.slice();
        oldLocations[index].name = location.name;
        oldLocations[index].address = location.address;

        setLocations(oldLocations);
      });
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Locations</h1>
      <LocationsList locations={locations} onDelete={deleteLocation} onEdit={updateLocation} />
      <NewLocationForm onAdd={addLocation} isEdit={false} />
    </section>
  );
};

export default Locations;

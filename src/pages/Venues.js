import React from "react";
import { useState, useEffect } from "react";
import NewVenueForm from "../components/venues/NewVenueForm";
import VenuesList from "../components/venues/VenuesList";

const VENUES_URL = "http://localhost:9000/venues";
const LOCATIONS_URL = "http://localhost:9000/locations";


const Venues = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [venues, setVenues] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(VENUES_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVenues(data);
      });
  }, []);

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

  function addVenue(venue) {
    fetch(VENUES_URL, {
      method: "POST",
      body: JSON.stringify(venue),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVenues([...venues, data]);
      });
  }

  function deleteVenue(venueId) {
    fetch(VENUES_URL + "/" + venueId, { method: "DELETE" })
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error(response.status);
        else return response;
      })
      .then((data) => {
        setVenues(
          venues.filter((venue) => venue.venueId !== venueId)
        );
      })
      .catch((error) => {
        alert("Deleting this venue is not allowed.");
      });
  }

  function editVenue(venueId, venue) {
    fetch(VENUES_URL + "/" + venueId, {
      method: "PUT",
      body: JSON.stringify(venue),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let index = venues.findIndex(x=> x.venueId === venueId);

        let oldVenues = venues.slice();
        oldVenues[index].name = venue.name;
        oldVenues[index].locationId = venue.locationId;
        oldVenues[index].numberOfPlaces = venue.numberOfPlaces;

        setVenues(oldVenues);
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
      <h2>Venues</h2>
      <VenuesList onDelete={deleteVenue} venues={venues} locations={locations} onEdit={editVenue}/>
      <NewVenueForm onAdd={addVenue} locations={locations} isEdit={false}/>
    </section>
  );
};

export default Venues;

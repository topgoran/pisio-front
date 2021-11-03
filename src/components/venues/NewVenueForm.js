import React from "react";
import { useState } from "react";
import Card from "../ui/Card";
import classes from './NewVenueForm.module.css'

const NewVenueForm = (props) => {
  const [venueName, setVenueName] = useState("");
  const [location, setLocation] = useState("");
  const [numberOfPlaces, setNumberOfPlaces] = useState(0);

  function addVenue(event) {
    event.preventDefault();

    let venue = {
        name: venueName,
        locationId: location,
        numberOfPlaces: numberOfPlaces
    };

    if(!props.isEdit){
      props.onAdd(venue);
    }else{
      props.onEdit(props.venueId, venue);
    }
  }

  return (
    <Card>
      <h2 className={classes.title}>{props.isEdit?"Edit venue":"Add new venue"}</h2>
      <form className={classes.form} onSubmit={addVenue}>
        <div className={classes.control}>
          <label htmlFor="name">Venue name</label>
          <input
            type="text"
            required
            id="name"
            onChange={(e) => setVenueName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <select
            type="text"
            required
            id="location"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="" disabled selected>
              Select location
            </option>

            {props.locations.map((location) => (
              <option key={location.locationId} value={location.locationId}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="numberOfPlaces">Number of places</label>
          <input
            type="number"
            required
            id="numberOfPlaces"
            onChange={(e) => setNumberOfPlaces(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button>{!props.isEdit?"Add venue":"Edit venue"}</button>
        </div>
      </form>
    </Card>
  );
};

export default NewVenueForm;

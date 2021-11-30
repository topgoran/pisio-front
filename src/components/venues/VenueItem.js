import React from "react";
import { useState } from "react";
import Card from "../ui/Card";
import NewVenueForm from "./NewVenueForm";
import classes from "./VenueItem.module.css";

const VenueItem = (props) => {
  const [update, setUpdate] = useState("");

  function deleteVenue(event) {
    event.preventDefault();

    props.onDelete(props.id);
  }

  function updateVenue(event) {
    setUpdate(true);
    event.preventDefault();
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>Location name: {props.locationName}</h3>
          <h3>Name: {props.name}</h3>
          <h3>Number of places: {props.numberOfPlaces}</h3>
        </div>
        <div className={classes.delete}>
          <button onClick={deleteVenue}>Delete</button>
        </div>
        <div className={classes.actions}>
          <button onClick={updateVenue}>Edit</button>
        </div>

        {update ? (
          <NewVenueForm onEdit={props.onEdit} locations={props.locations} isEdit={true} venueId={props.id}/>
        ) : (
          ""
        )}
      </Card>
    </li>
  );
};

export default VenueItem;

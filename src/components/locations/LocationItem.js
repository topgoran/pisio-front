import React from "react";
import { useState } from "react";
import Card from "../ui/Card";
import NewLocationForm from "./NewLocationForm";
import classes from "./LocationItem.module.css";

const LocationItem = (props) => {
  const [update, setUpdate] = useState("");

  function deleteLocation(event) {
    event.preventDefault();

    props.onDelete(props.id);
  }

  function updateLocation(event) {
    event.preventDefault();

    setUpdate(true);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>Name: {props.name}</h3>
          <address>Address: {props.address}</address>
        </div>
        <div className={classes.delete}>
          <button onClick={deleteLocation}>Delete</button>
        </div>
        <div className={classes.actions}>
          <button onClick={updateLocation}>Edit</button>
        </div>
        {update ? <NewLocationForm onEdit={props.onEdit} isEdit={true} locationId={props.id}/> : ""}
      </Card>
    </li>
  );
};

export default LocationItem;

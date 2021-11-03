import React from "react";
import { useState } from "react";
import Card from "../ui/Card";
import classes from "./NewLocationForm.module.css";

const NewLocationForm = (props) => {
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");

  function addLocation(event) {
    event.preventDefault();

    const location = {
      name: locationName,
      address: address,
    };

    if (!props.isEdit) {
      props.onAdd(location);
    } else {
      props.onEdit(props.locationId, location);
    }
  }

  return (
    <Card>
      <h2 className={classes.title}>
        {!props.isEdit ? "Add new location" : "Edit location"}
      </h2>
      <form className={classes.form} onSubmit={addLocation}>
        <div className={classes.control}>
          <label htmlFor="name">Location name</label>
          <input
            type="text"
            required
            id="name"
            onChange={(e) => setLocationName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            required
            id="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button>{!props.isEdit ? "Add location" : "Edit location"}</button>
        </div>
      </form>
    </Card>
  );
};

export default NewLocationForm;

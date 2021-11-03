import React from "react";
import LocationItem from "./LocationItem";
import classes from "./LocationList.module.css";

const LocationsList = (props) => {
  
  return (
    <ul className={classes.list}>
      {props.locations.map((location) => (
        <LocationItem
          key={location.locationId}
          id={location.locationId}
          name={location.name}
          address={location.address}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
        />
      ))}
    </ul>
  );
};

export default LocationsList;

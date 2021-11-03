import React from "react";
import VenueItem from "./VenueItem";
import classes from './VenueList.module.css'

const VenuesList = (props) => {
  return (
    <ul className={classes.list}>
      {props.venues.map((venue) => (
        <VenueItem
          key={venue.venueId}
          id={venue.venueId}
          name={venue.name}
          numberOfPlaces={venue.numberOfPlaces}
          locationName={venue.locationName}
          onDelete={props.onDelete}
          locations={props.locations}
          onEdit={props.onEdit}
        />
      ))}
    </ul>
  );
};

export default VenuesList;

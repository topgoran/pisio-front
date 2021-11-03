import React from "react";
import EventItem from "./EventItem";
import classes from './EventsList.module.css'

const EventsList = (props) => {
  if(props.events.length == 0){
    return (
      <h2>No events at the moment</h2>
    )
  }
  return (
    <div className={classes.frame}>
      <h2 className={classes.title}>Events</h2>
      <ul className={classes.list}>
        {props.events.map((event) => (
          <EventItem
            key={event.eventId}
            id={event.eventId}
            name={event.name}
            description={event.description}
            timeFrom={event.timeFrom}
            timeTo={event.timeTo}
            moderator={event.userModerator}
            lecturer={event.userLecturer}
            sessionId={event.sessionId}
            isOnline={event.isOnline}
            accessLink={event.accessLink}
            accessPassword={event.accessPassword}
            eventType={event.eventType.eventTypeName}
            venue={event.venue !== null? event.venue.name : null}
            numberOfPlaces={event.venue !== null? event.venue.numberOfPlaces : null} 
          />
        ))}
      </ul>
    </div>
  );
};

export default EventsList;

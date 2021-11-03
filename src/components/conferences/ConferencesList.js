import React from "react";
import ConferenceItem from "./ConferenceItem";
import classes from "./ConferencesList.module.css";

const ConferencesList = (props) => {

  console.log(props.conferences);

  if(props.conferences.length == 0){
    return (
      <h2>No conferences at the moment</h2>
    )
  }
  return (
    <ul className={classes.list}>
      {props.conferences.map((conference) => (
        <ConferenceItem
          key={conference.conferenceId}
          id={conference.conferenceId}
          name={conference.name}
          date_from={conference.dateFrom.split(" ")[0]}
          date_to={conference.dateTo.split(" ")[0]}
          location={conference.location}
          description={conference.description}
          image={conference.imageUrl}
          is_online={conference.isOnline}
        />
      ))}
    </ul>
  );
};

export default ConferencesList;

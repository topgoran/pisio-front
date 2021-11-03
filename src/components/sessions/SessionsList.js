import React from "react";
import SessionItem from "./SessionItem";
import classes from './SessionsList.module.css'

const SessionsList = (props) => {
  if(props.sessions.length == 0){
    return (
      <h2>No sessions at the moment</h2>
    )
  }
  return (
    <div className={classes.frame}>
      <h2 className={classes.title}>Sessions</h2>
      <ul className={classes.list}>
      {props.sessions.map((session) => (
        <SessionItem
          key={session.sessionId}
          id={session.sessionId}
          name={session.name}
          description={session.description}
          date={session.date}
          moderator={session.user}
          conferenceId={props.conferenceId}
        />
      ))}
      </ul>
    </div>
  );
};

export default SessionsList;

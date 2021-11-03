import { useParams } from "react-router";
import { useState, useEffect } from "react";
import React from "react";
import classes from "./EditEvent.module.css";
import EventItem from "../components/events/EventItem";
import NewEventForm from "../components/events/NewEventForm";

const EVENTS_URL = "http://localhost:9000/events";
const GET_SESSION_ID_URL = "http://localhost:9000/sessions/byevent";
const GET_CONFERENCE_ID_URL = "http://localhost:9000/conferences/bysession";
const SESSIONS_URL = "http://localhost:9000/sessions";

const EditEvent = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [conferenceId, setConferenceId] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(GET_SESSION_ID_URL + "/" + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSessionId(data);
        let sesId = data;
        fetch(GET_CONFERENCE_ID_URL + "/" + sesId)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setConferenceId(data);
          });

          
          fetch(SESSIONS_URL + "/" + sesId)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setSession(data);
            console.log(data);
            setIsLoading(false);
          });
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(EVENTS_URL + "/" + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEvent(data);
        //setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <ul className={classes.list}>
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
        venue={event.venue !== null ? event.venue.name : null}
        numberOfPlaces={
          event.venue !== null ? event.venue.numberOfPlaces : null
        }
      />
      <NewEventForm
        isEdit={true}
        editId={id}
        conferenceId={conferenceId}
        session={session}
      />
    </ul>
  );
};

export default EditEvent;

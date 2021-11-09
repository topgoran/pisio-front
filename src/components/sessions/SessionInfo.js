import { useState } from "react";
import { useContext } from 'react'
import ConferenceContext from '../../store/context'
import React from "react";
import EventsList from "../events/EventsList";
import NewEventForm from "../events/NewEventForm";
import SessionData from "./SessionData";

const EVENTS_URL = "http://localhost:9000/events";
const EVENT_HAS_RESOURCES_URL = "http://localhost:9000/eventhasresources";

const SessionInfo = (props) => {
  const conferenceCtx = useContext(ConferenceContext);

  const [addingTried, setAddingTried] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [events, setEvents] = useState(props.events);

  function addNewEvent(newEvent, newResources) {
    fetch(EVENTS_URL, {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        setEvents([...events, data]);
        let eventId = data.eventId;
        for (let i = 0; i < newResources.length; i++) {
          fetch(EVENT_HAS_RESOURCES_URL, {
            method: "POST",
            body: JSON.stringify({
              number: newResources[i].amount,
              resourceId: newResources[i].id,
              eventId: eventId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) throw new Error(response.status);
              else return response.json();
            })
            .then((data) => {
              setAddingTried(true);
              setPostSuccess(true);
            })
            .catch((error) => {
              setPostSuccess(false);
            });
        }
      })
      .catch((error) => {
        setPostSuccess(false);
      });
  }

  return (
    <div>
      <SessionData session={props.session} />
      <EventsList events={events} date={props.session.date}/>
      {window.location.href.indexOf("responsibilities") > -1 ? (
        <NewEventForm
          session={props.session}
          onAdd={addNewEvent}
          addingTried={addingTried}
          postSuccess={postSuccess}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SessionInfo;

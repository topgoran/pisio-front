import { useContext, useEffect, useState } from "react";
import React from "react";
import ConferencesList from "../components/conferences/ConferencesList";
import SessionsList from "../components/sessions/SessionsList";
import EventsList from "../components/events/EventsList";
import ConferenceContext from "../store/context";

const CONFERENCES_URL = "http://localhost:9000/conferences";
const SESSIONS_URL = "http://localhost:9000/sessions";
const EVENTS_URL = "http://localhost:9000/events";

const UsersResponsibilities = () => {
  const conferenceCtx = useContext(ConferenceContext);

  const [isLoading, setIsLoading] = useState(true);
  const [conferences, setConferences] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(CONFERENCES_URL + "/creator/" + conferenceCtx.userId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setConferences(data);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(SESSIONS_URL + "/moderator/" + conferenceCtx.userId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSessions(data);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(EVENTS_URL + "/moderator/" + conferenceCtx.userId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setEvents(data);
      });
  }, []);

  return (
    <div>
      <h1>Created conferences</h1>
      <ConferencesList conferences={conferences} />
      {conferenceCtx.userType == "M" ? (
        <div>
          <h1>My moderations</h1>
          <SessionsList sessions={sessions} />
          <EventsList events={events} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UsersResponsibilities;

import { useParams } from "react-router";
import { useState, useEffect } from "react";
import React from "react";
import NewSessionFrom from "../components/sessions/NewSessionForm";
import SessionItem from "../components/sessions/SessionItem";
import classes from './EditSession.module.css'

const SESSIONS_URL = "http://localhost:9000/sessions";
const GET_CONFERENCE_ID_URL = "http://localhost:9000/conferences/bysession";

const EditSession = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState("");
  const [conferenceId, setConferenceId] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(GET_CONFERENCE_ID_URL + "/" + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setConferenceId(data);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(SESSIONS_URL + "/" + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSession(data);
        setIsLoading(false);
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
      <SessionItem
        key={session.sessionId}
        id={session.sessionId}
        name={session.name}
        description={session.description}
        date={session.date}
        moderator={session.user}
      />
      <NewSessionFrom isEdit={true} editId={session.sessionId} conferenceId={conferenceId}/>
    </ul>
  );
};

export default EditSession;

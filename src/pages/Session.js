import { useState, useEffect } from "react";
import { useParams } from "react-router";
import React from "react";
import SessionInfo from "../components/sessions/SessionInfo";

const SESSIONS_URL = "http://localhost:9000/sessions";

const Session = () => {
  const { id2 } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(SESSIONS_URL + "/" + id2)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSession(data);
        setEvents(data.events);
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
    <div>
      <h1>Session</h1>
      <SessionInfo session={session} events={events}/>
    </div>
  );
};

export default Session;

import { useParams } from "react-router";
import { useState, useEffect } from "react";
import React from "react";
import ConferenceInfo from "../components/conferences/ConferenceInfo";

const CONFERENCES_URL = "http://localhost:9000/conferences";

const Conference = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [conference, setConference] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(CONFERENCES_URL + "/" + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setConference(data);
        setSessions(data.sessions);
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
    <section>
      <h1>Conference</h1>
        <ConferenceInfo userId={id} conference={conference} sessions={sessions}/>   
    </section>
  );
};

export default Conference;

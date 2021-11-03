import { useContext, useEffect } from "react";
import ConferenceContext from "../store/context";
import React from "react";
import { useState } from "react";
import ConferencesList from "../components/conferences/ConferencesList";

const EVENTS_URL = "http://localhost:9000/eventhasattendees/findbyattendee";
const CONFERENCES_URL = "http://localhost:9000/conferences/byeventids";

const UsersConferences = () => {
  const conferenceCtx = useContext(ConferenceContext);
  const [conferences, setConferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(EVENTS_URL + "/" + conferenceCtx.userId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fetch(
            CONFERENCES_URL,
            {
              method: 'POST',
              body: JSON.stringify({
                eventIds : data
              }),
              headers: {
                'Content-Type': 'application/json'
              }
          }).then(response => {
              if(!response.ok) throw new Error(response.status);
              else return response.json();
          }).then(data => {
            setConferences(data);
            setIsLoading(false);
          })
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
      <h1>My check ins</h1>
      <ConferencesList conferences={conferences} />
    </section>
  );
};

export default UsersConferences;

import { useParams } from "react-router";
import { useState, useEffect } from "react";
import React from "react";
import NewConferenceForm from "../components/conferences/NewConferenceForm";
import ConferenceItem from "../components/conferences/ConferenceItem";
import classes from './EditConference.module.css'

const CONFERENCES_URL = "http://localhost:9000/conferences";

const EditConference = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [conference, setConference] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(CONFERENCES_URL + "/" + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setConference(data);
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
  return(
  <ul className={classes.list}>
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
    <NewConferenceForm isEdit={true} conferenceToEdit={conference} />
  </ul>);
};

export default EditConference;

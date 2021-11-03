import { useState, useEffect } from "react";
import ConferencesList from "../components/conferences/ConferencesList";

const CONFERENCES_URL = 'http://localhost:9000/conferences/new';

const AllConferences = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(CONFERENCES_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setConferences(data);
      });
  }, []);

  if(isLoading){
    return (
      <section>
        <p>Loading...</p>
      </section>
    )
  }
  return (
    <section>
      <h1>Current and upcoming conferences</h1>
      <ConferencesList conferences={conferences}/>
    </section>
  );
};

export default AllConferences;

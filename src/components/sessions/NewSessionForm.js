import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import React from "react";
import Card from "../ui/Card";
import classes from "./NewSessionForm.module.css";
import DatePicker from "react-datepicker";

const MODERATORS_URL = "http://localhost:9000/users/type/M";
const SESSIONS_URL = "http://localhost:9000/sessions"

const NewSessionForm = (props) => {
  const history = useHistory();
  
  const [moderators, setModerators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [moderator, setModerator] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(MODERATORS_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setModerators(data);
      });
  }, []);

  function addNewSession(event) {
    event.preventDefault();

    const session = {
      conferenceId: props.conferenceId,
      name: name,
      description: description,
      date: startDate.toISOString().split("T")[0] + " 00:00:00",
      userId: moderator,
    };
    if(props.isEdit){
      fetch(SESSIONS_URL + "/" + props.editId, {
        method: "PUT",
        body: JSON.stringify(session),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then((data) => {
          console.log(data);

          history.replace("/responsibilities");
        })
        .catch((error) => {
        });
    }
    else{
      props.onAdd(session);
    }
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  return (
    <Card>
      <h2 className={classes.title}>Add new session</h2>
      <form className={classes.form} onSubmit={addNewSession}>
        <div className={classes.control}>
          <label htmlFor="name">Session name</label>
          <input
            type="text"
            required
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Session description</label>
          <textarea
            required
            id="description"
            rows="5"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="start_date">Session date</label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="moderator">Moderator</label>
          <select
            type="text"
            required
            id="moderator"
            defaultValue=""
            onChange={(e) => setModerator(e.target.value)}
          >
            <option value="" disabled>
              Select moderator
            </option>
            {moderators.map((moderator) => (
              <option key={moderator.id} value={moderator.id}>
                {moderator.name} {moderator.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.actions}>
          <button>{props.isEdit?"Edit session" : "Add session"}</button>
        </div>
        {props.addingTried ? (
          !props.postSuccess ? (
            <div className={classes.control}>
              <label>Adding failed. Try again.</label>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </form>
    </Card>
  );
};

export default NewSessionForm;

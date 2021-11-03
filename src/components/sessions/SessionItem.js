import { useHistory } from "react-router";
import React from "react";
import classes from "./SessionItem.module.css";
import Card from "../ui/Card";

const SessionItem = (props) => {
  const history = useHistory();

  function showSession(event) {
    event.preventDefault();
    if (window.location.href.indexOf("responsibilities") > -1) {
      history.push(
        "/responsibilities/conference/" + props.conferenceId + "/" + props.id
      );
    } else {
      history.push("/conference/" + props.conferenceId + "/" + props.id);
    }
  }

  function editSession(event) {
    event.preventDefault();
    history.push("/responsibilities/edit-session/" + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <time>{props.date.split(" ")[0]}</time>
          <p>{props.description}</p>
          <p>
            Session moderator: {props.moderator.name} {props.moderator.lastName}
          </p>
        </div>
        {window.location.href.indexOf("responsibilities") > -1 ? (
          window.location.href.indexOf("/responsibilities/conference/") > -1 ? (
            <div>
              <div className={classes.actions}>
                <button onClick={showSession}>Show session</button>
                <div className={classes.actions}>
                  <button onClick={editSession}>Edit session</button>
                </div>
              </div>
            </div>
          ) : window.location.href.indexOf("/responsibilities/edit-session/") > -1 ? "" : (
            <div className={classes.actions}>
              <button onClick={editSession}>Edit session</button>
            </div>
          )
        ) : (
          <div className={classes.actions}>
            <button onClick={showSession}>Show session</button>
          </div>
        )}
      </Card>
    </li>
  );
};

export default SessionItem;

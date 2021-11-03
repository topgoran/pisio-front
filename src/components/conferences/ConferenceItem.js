import { useContext } from "react";
import { useHistory } from "react-router-dom";
import React from "react";
import Card from "../ui/Card";
import classes from "./ConferenceItem.module.css";
import ConferenceContext from "../../store/context";

const ConferenceItem = (props) => {
  const conferenceCtx = useContext(ConferenceContext);
  const history = useHistory();

  function showConference() {
    if (window.location.href.indexOf("responsibilities") > -1) {
      history.push("/responsibilities/conference/" + props.id);
    } else {
      history.push("/conference/" + props.id);
    }
  }

  function editConference(event) {
    event.preventDefault();
    history.push("/responsibilities/edit-conference/" + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <time>{props.date_from}</time> - <time>{props.date_to}</time>
          {props.location == undefined? "" : <address>{props.location.name} - {props.location.address}</address>}
          <p>{props.description}</p>
          <p>{props.is_online === "true" ? "Conference is online" : ""}</p>
        </div>
        {window.location.href.indexOf("edit-conference") > -1 ? (
          ""
        ) : (
          <div className={classes.actions}>
            <button onClick={showConference}>Show conference</button>
          </div>
        )}
        {window.location.href.indexOf("responsibilities") > -1 ? (
          window.location.href.indexOf("edit-conference") > -1 ? (
            ""
          ) : (
            <div className={classes.actions}>
              <button onClick={editConference}>Edit conference</button>
            </div>
          )
        ) : (
          ""
        )}
      </Card>
    </li>
  );
};

export default ConferenceItem;

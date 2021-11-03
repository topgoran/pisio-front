import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import ConferenceContext from "../../store/context";
import classes from "./EventItem.module.css";
import Card from "../ui/Card";

const CHECK_IF_ATTENDEE =
  "http://localhost:9000/eventhasattendees/checkifattendee";
const CHECK_OUT = "http://localhost:9000/eventhasattendees/delete";
const CHECK_IN = "http://localhost:9000/eventhasattendees";
const ATTENDEES_COUNT_URL =
  "http://localhost:9000/eventhasattendees/countattendees";

const EventItem = (props) => {
  const history = useHistory();
  const conferenceCtx = useContext(ConferenceContext);

  const [isAttendee, setIsAttendee] = useState(null);
  const [attendeesCount, setAttendeesCount] = useState(0);

  getAttendeesCount();

  useEffect(() => {
    if (window.location.href.indexOf("responsibilities") < 0) {
      fetch(CHECK_IF_ATTENDEE + "/" + props.id + "/" + conferenceCtx.userId)
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          return response.json();
        })
        .then((data) => {
          setIsAttendee(data);
        })
        .catch((error) => {
          setIsAttendee(null);
        });
    }
  }, []);

  function checkIn(event) {
    event.preventDefault();
    fetch(CHECK_IN, {
      method: "POST",
      body: JSON.stringify({
        userId: conferenceCtx.userId,
        eventId: props.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsAttendee("true");
      });

    getAttendeesCount();
  }
  function checkOut(event) {
    event.preventDefault();

    fetch(CHECK_OUT + "/" + props.id + "/" + conferenceCtx.userId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsAttendee(null);
      });

    getAttendeesCount();
  }

  function getAttendeesCount() {
    fetch(ATTENDEES_COUNT_URL + "/" + props.id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAttendeesCount(data);
      });
  }

  function editEvent(event) {
    event.preventDefault();
    history.push("/responsibilities/edit-event/" + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <time>
            {props.timeFrom.split(" ")[1]} - {props.timeTo.split(" ")[1]}
          </time>
          <p>{props.description}</p>
          <p>
            Event moderator: {props.moderator.name} {props.moderator.lastName}
          </p>
          <p>
            Event lecturer: {props.lecturer.name} {props.lecturer.lastName}
          </p>
          <p>{props.isOnline === "true" ? "Event is online" : ""}</p>
          <p>
            {props.accessLink === null
              ? ""
              : "Access link is " + props.accessLink}
          </p>
          <p>
            {props.accessPassword === null
              ? ""
              : "Access password is " + props.accessPassword}
          </p>
          <p>Event type: {props.eventType}</p>
          <p>{props.venue === null ? "" : "Venue: " + props.venue}</p>
          <p>
            {props.venue === null
              ? ""
              : "Attendees count: " +
                attendeesCount +
                "/" +
                props.numberOfPlaces}
          </p>
          {window.location.href.indexOf("responsibilities") > -1 ? (
            window.location.href.indexOf("edit-event") > -1 ? (
              ""
            ) : (
              <div className={classes.actions}>
                <button onClick={editEvent}>Edit event</button>
              </div>
            )
          ) : (
            [
              conferenceCtx.userId == "" ? (
                ""
              ) : isAttendee === null ? (
                <div className={classes.checkIn}>
                  <button
                    onClick={checkIn}
                    disabled={attendeesCount === props.numberOfPlaces}
                  >
                    Check in
                  </button>
                </div>
              ) : (
                <div className={classes.checkOut}>
                  <button onClick={checkOut}>Check out</button>
                </div>
              ),
            ]
          )}
        </div>
      </Card>
    </li>
  );
};

export default EventItem;

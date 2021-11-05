import { useContext } from "react";
import ConferenceContext from "../../store/context";
import React from "react";
import { useState, useEffect } from "react";
import NewSessionForm from "../sessions/NewSessionForm";
import SessionsList from "../sessions/SessionsList";
import ConferenceData from "./ConferenceData";
import classes from "./ConferenceInfo.module.css";

const SESSIONS_URL = "http://localhost:9000/sessions";
const RATINGS_URL = "http://localhost:9000/users/userforconference";

const USER_GRADES_URL = "http://localhost:9000/usergrades";

const ConferenceInfo = (props) => {
  const conferenceCtx = useContext(ConferenceContext);
  const [addingTried, setAddingTried] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const [sessions, setSessions] = useState(props.sessions);

  function addSession(session) {
    fetch(SESSIONS_URL, {
      method: "POST",
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
        setAddingTried(true);
        setPostSuccess(true);
        setSessions([...sessions, data]);
      })
      .catch((error) => {
        setPostSuccess(false);
      });
  }

  const oldGrades = new Map();
  const oldGradesIds = [];

  useEffect(() => {
    if (conferenceCtx.userId != "") {
      fetch(
        RATINGS_URL +
          "/" +
          conferenceCtx.userId +
          "/" +
          props.conference.conferenceId
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            oldGrades.set(
              data[i].gradingSubject.gradingSubjectId,
              data[i].grade
            );
            oldGradesIds.push(data[i].gradeId);
          }
          console.log("old grades", oldGrades);
          console.log("old grades ids", oldGradesIds);
        });
    }
  }, []);

  function saveRatings(map) {
    for (let i = 0; i < props.conference.gradingSubjects.length; i++) {
      let grade = map.get(props.conference.gradingSubjects[i].gradingSubjectId);

      let oldGrade = oldGrades.get(
        props.conference.gradingSubjects[i].gradingSubjectId
      );
      if (oldGrade == undefined) {
        fetch(USER_GRADES_URL, {
          method: "POST",
          body: JSON.stringify({
            grade: grade,
            userId: conferenceCtx.userId,
            gradingSubjectId:
              props.conference.gradingSubjects[i].gradingSubjectId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });
      } else {
        fetch(USER_GRADES_URL + "/" + oldGradesIds[i], {
          method: "PUT",
          body: JSON.stringify({
            grade: grade,
            userId: conferenceCtx.userId,
            gradingSubjectId:
              props.conference.gradingSubjects[i].gradingSubjectId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });
      }
    }
  }

  return (
    <section className={classes.form}>
      <ConferenceData
        conference={props.conference}
        oldGrades={oldGrades}
        onSave={saveRatings}
      />
      <SessionsList
        conferenceId={props.conference.conferenceId}
        sessions={sessions}
      />
      {window.location.href.indexOf("responsibilities") > -1 ? (
        <NewSessionForm
          onAdd={addSession}
          conferenceId={props.conference.conferenceId}
          addingTried={addingTried}
          postSuccess={postSuccess}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default ConferenceInfo;

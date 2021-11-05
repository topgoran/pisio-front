import { useContext } from "react";
import ConferenceContext from "../../store/context";
import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import Card from "../ui/Card";
import classes from "./ConferenceData.module.css";

const RATINGS_URL = "http://localhost:9000/users/userforconference";
const USER_GRADES_URL = "http://localhost:9000/usergrades";
const AVG_RATINGS_URL = "http://localhost:9000/conferences/avg";

const ConferenceData = (props) => {
  const conferenceCtx = useContext(ConferenceContext);
  const [isRating, setIsRating] = useState(false);
  const [messageShow, setMessageShow] = useState(false);
  const [gradeChange, setGradeChange] = useState(false);
  const [avgGrades, setAvgGrades] = useState([]);

  const map = new Map();
  const oldGrades = new Map();

  const currentDate = new Date();

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
          for (let i = 0; i < data.length; i++) {
            oldGrades.set(
              data[i].gradingSubject.gradingSubjectId,
              data[i].grade
            );
          }
        });
    }
  }, []);

  useEffect(() => {
    fetch(AVG_RATINGS_URL + "/" + props.conference.conferenceId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAvgGrades(data);
      });
  }, []);

  function onGradeChange() {
    for (let i = 0; i < props.conference.gradingSubjects.length; i++) {
      let selectItemId = props.conference.gradingSubjects[i].gradingSubjectId;
      let grade =
        document.getElementById(selectItemId).options[
          document.getElementById(selectItemId).selectedIndex
        ].text;
      map.set(selectItemId, grade);
    }
    setGradeChange(true);
  }

  function onRate(event) {
    event.preventDefault();

    setIsRating(true);
  }

  function saveRatings(event) {
    event.preventDefault();
    /*for(let i = 0; i < props.conference.gradingSubjects.length; i++){
      let grade = map.get(props.conference.gradingSubjects[i].gradingSubjectId);

      fetch(
        USER_GRADES_URL,
        {
          method: 'POST',
          body: JSON.stringify({
            grade: grade,
            userId: conferenceCtx.userId,
            gradingSubjectId: props.conference.gradingSubjects[i].gradingSubjectId
          }),
          headers: {
            'Content-Type': 'application/json'
          }
      }).then(response => {
         return response.json();
      }).then(data => {
        console.log(data);
      })
    }
    setIsRating(false);*/
    if (!gradeChange) {
      for (let i = 0; i < props.conference.gradingSubjects.length; i++) {
        let selectItemId = props.conference.gradingSubjects[i].gradingSubjectId;
        map.set(selectItemId, 1);
      }
    }
    console.log("MAPA PRIJE RATE", map);
    props.onSave(map);
    setMessageShow(true);
  }

  return (
    <Card>
      <div className={classes.image}>
        <img src={props.conference.imageUrl} alt={props.title} />
      </div>
      <div className={classes.content}>
        <h3>{props.conference.name}</h3>
        <time>{props.conference.dateFrom.split(" ")[0]}</time> -{" "}
        <time>{props.conference.dateTo.split(" ")[0]}</time>
        <address>
          {props.conference.location.name} - {props.conference.location.address}
        </address>
        <p>{props.conference.description}</p>
        <p>
          Conference creator: {props.conference.userCreator.name}{" "}
          {props.conference.userCreator.lastName}
        </p>
        <p>
          {props.conference.isOnline === true ? "Conference is online" : ""}
        </p>
        {avgGrades.length > 0 ? (
          <div>
            {avgGrades.map((grade) => (
              <p>
                {grade.gradingSubjectName}(Average rating) : {grade.avgRating}
              </p>
            ))}
          </div>
        ) : (
          ""
        )}
        {(conferenceCtx.userId != "" && currentDate > new Date(props.conference.dateTo)) ? (
          !isRating ? (
            <div className={classes.actions}>
              <button onClick={onRate}>Rate this conference</button>
            </div>
          ) : (
            props.conference.gradingSubjects.map((subject) => (
              <div className={classes.control}>
                <label htmlFor={subject.gradingSubjectId}>
                  {subject.name}{" "}
                  {props.oldGrades.get(subject.gradingSubjectId) == undefined
                    ? ""
                    : " - last grade was " +
                      props.oldGrades.get(subject.gradingSubjectId)}
                </label>
                <select
                  type="number"
                  required
                  id={subject.gradingSubjectId}
                  onChange={(e) => onGradeChange(e.target.value)}
                >
                  <option key={1} value={1}>
                    {1}
                  </option>
                  <option key={2} value={2}>
                    {2}
                  </option>
                  <option key={3} value={3}>
                    {3}
                  </option>
                  <option key={4} value={4}>
                    {4}
                  </option>
                  <option key={5} value={5}>
                    {5}
                  </option>
                </select>
              </div>
            ))
          )
        ) : (
          ""
        )}
        {isRating ? (
          <div className={classes.actions}>
            <button onClick={saveRatings}>Save ratings</button>
          </div>
        ) : (
          ""
        )}
        {messageShow ? <h3>Rating done successfully</h3> : ""}
      </div>
    </Card>
  );
};

export default ConferenceData;

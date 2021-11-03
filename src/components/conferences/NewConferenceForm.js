import { useContext } from "react";
import ConferenceContext from "../../store/context";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import classes from "./NewConferenceForm.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Card from "../ui/Card";
import DatePicker from "react-datepicker";

const LOCATIONS_URL = "http://localhost:9000/locations";
const CONFERENCE_URL = "http://localhost:9000/conferences";
const GRADING_SUBJECT_URL = "http://localhost:9000/gradingsubjects";

const NewConferenceForm = (props) => {
  const conferenceCtx = useContext(ConferenceContext);

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [gradingSubjects, setGradingSubjects] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(LOCATIONS_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLocations(data);
      });
  }, []);

  const [conferenceName, setConferenceName] = useState("");
  const [conferenceImageUrl, setConferenceImageUrl] = useState("");
  const [conferenceLocation, setConferenceLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [conferenceDescription, setCOnferenceDescription] = useState("");
  const [conferenceType, setConferenceType] = useState("false");

  const [addingTried, setAddingTried] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  function addNewConference(event) {
    event.preventDefault();

    const conference = {
      name: conferenceName,
      description: conferenceDescription,
      imageUrl: conferenceImageUrl,
      locationId: conferenceLocation,
      dateFrom: startDate.toISOString().split("T")[0] + " 00:00:00",
      dateTo: endDate.toISOString().split("T")[0] + " 00:00:00",
      isOnline: conferenceType,
      userCreatorId: conferenceCtx.userId,
    };

    if (!props.isEdit) {
      fetch(CONFERENCE_URL, {
        method: "POST",
        body: JSON.stringify(conference),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then((data) => {
          let conferenceId = data.conferenceId;
          console.log(data);
          setAddingTried(true);

          for (let i = 0; i < gradingSubjects.length; i++) {
            console.log(gradingSubjects[i]);
            fetch(GRADING_SUBJECT_URL, {
              method: "POST",
              body: JSON.stringify({
                conferenceId: conferenceId,
                name: gradingSubjects[i],
              }),
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
                setPostSuccess(true);
                setGradingSubjects([]);
                history.replace("/");
              })
              .catch((error) => {
                setPostSuccess(false);
              });
          }
          setGradingSubjects([]);
          setPostSuccess(true);
          history.replace("/");
        })
        .catch((error) => {
          setPostSuccess(false);
        });
    } else {
      fetch(CONFERENCE_URL + "/" + props.conferenceToEdit.conferenceId, {
        method: "PUT",
        body: JSON.stringify(conference),
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
          setAddingTried(true);

          setPostSuccess(true);
          history.replace("/");
        })
        .catch((error) => {
          setPostSuccess(false);
        });
    }
  }

  function addGradingSubject(event) {
    event.preventDefault();
    let gradingSubject = document.getElementById("gradingSubject").value;
    if (gradingSubject != "" && gradingSubject != null) {
      gradingSubjects.push(gradingSubject);
      document.getElementById("gradingSubjects").value +=
        "- " + gradingSubject + "\n";
      document.getElementById("gradingSubject").value = "";
    }
  }

  function clearGradingSubjects(event) {
    event.preventDefault();
    document.getElementById("gradingSubjects").value = "";
    setGradingSubjects([]);
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
      <form className={classes.form} onSubmit={addNewConference}>
        <div className={classes.control}>
          <label htmlFor="name">Conference name</label>
          <input
            type="text"
            required
            id="name"
            onChange={(e) => setConferenceName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="is_online">Is conference online</label>
          <select
            type="text"
            required
            id="is_online"
            onChange={(e) => setConferenceType(e.target.value)}
          >
            <option value="false">Offline</option>
            <option value="true">Online</option>
          </select>
        </div>
        {conferenceType === "false" ? (
          <div className={classes.control}>
            <label htmlFor="location">Location</label>
            <select
              type="text"
              required
              id="location"
              onChange={(e) => setConferenceLocation(e.target.value)}
            >
              <option value="" disabled selected>
                Select location
              </option>

              {locations.map((location) => (
                <option key={location.locationId} value={location.locationId}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          ""
        )}
        <div className={classes.control}>
          <label htmlFor="image">Conference image</label>
          <input
            type="url"
            required
            id="image"
            onChange={(e) => setConferenceImageUrl(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="start_date">Conference start date</label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="end_date">Conference end date</label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            required
            id="description"
            rows="5"
            onChange={(e) => setCOnferenceDescription(e.target.value)}
          />
        </div>
        {props.isEdit ? (
          ""
        ) : (
          <div>
            <div className={classes.control}>
              <label htmlFor="gradingSubject">Grading subject</label>
              <input type="text" id="gradingSubject" />
              <div className={classes.actions}>
                <button onClick={addGradingSubject}>Add grading subject</button>
                <button onClick={clearGradingSubjects}>
                  Clear grading subjects
                </button>
              </div>
            </div>
            <div className={classes.control}>
              <label htmlFor="gradingSubjects">Added grading subjects</label>
              <textarea
                required
                id="gradingSubjects"
                rows="5"
                disabled
                className={classes.disabled}
              />
            </div>
          </div>
        )}
        <div className={classes.actions}>
          <button>{props.isEdit?"Edit conference" : "Add conference"}</button>
        </div>
        {addingTried ? (
          !postSuccess ? (
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

export default NewConferenceForm;

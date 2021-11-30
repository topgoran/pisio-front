import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import React from "react";
import classes from "./NewEventForm.module.css";
import Card from "../ui/Card";
import DatePicker from "react-datepicker";

const MODERATORS_URL = "http://localhost:9000/users/type/M";
const LECTURERSS_URL = "http://localhost:9000/users/type/L";
const EVENT_TYPES_URL = "http://localhost:9000/eventtypes";
const VENUES_URL = "http://localhost:9000/venues/location";
const CONFERENCES_URL = "http://localhost:9000/conferences";
const RESOURCES_URL = "http://localhost:9000/resources";
const EVENTS_URL = "http://localhost:9000/events";
const EVENTS_BY_VENUE_AND_DATE = "http://localhost:9000/events/byvenueanddate";
const EVENTS_COLLISION_URL = "http://localhost:9000/events/check";

const NewEventForm = (props) => {
  const { id } = useParams();
  const { id2 } = useParams();

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [moderators, setModerators] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [venues, setVenues] = useState([]);
  const [resources, setResources] = useState([]);
  const [conferenceLocation, setConferenceLocation] = useState("");
  const [eventsByVenueAndDate, setEventsByVenueAndDate] = useState([]);

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [moderator, setModerator] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [eventType, setEventType] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [venue, setVenue] = useState(null);
  const [isOnline, setIsOnline] = useState("");
  const [accessLink, setAccessLink] = useState(null);
  const [accessPassword, setAccessPassword] = useState(null);

  const [resourceAmount, setResourceAmount] = useState(0);
  const [newResourceId, setNewResourceId] = useState("");
  const [newResourceName, setNewResourceName] = useState("");

  const [newResources, setNewResources] = useState([]);

  const [collisionCheck, setCollisionCheck] = useState(false);
  

  useEffect(() => {

    setIsLoading(true);
    fetch(MODERATORS_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setModerators(data);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(LECTURERSS_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLecturers(data);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(EVENT_TYPES_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEventTypes(data);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(RESOURCES_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResources(data);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (!props.isEdit) {
      fetch(CONFERENCES_URL + "/" + id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("DATA", data);
          let conferenceLocation = data.location.locationId;
          fetch(VENUES_URL + "/" + conferenceLocation)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              setVenues(data);
              setIsLoading(false);
            });
        }, []);
    } else {
      fetch(CONFERENCES_URL + "/" + props.conferenceId)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("DATA", data);
          let conferenceLocation = data.location.locationId;
          fetch(VENUES_URL + "/" + conferenceLocation)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              setVenues(data);
              setIsLoading(false);
            });
        }, []);
    }
  }, []);

  function addResource(event) {
    event.preventDefault();

    const newResourceObj = {
      id: newResourceId,
      amount: resourceAmount,
    };

    newResources.push(newResourceObj);
    document.getElementById("resources").innerHTML +=
      "- " + newResourceName + ", amount: " + resourceAmount + "\n";
  }

  function removeResources(event) {
    event.preventDefault();
    document.getElementById("resources").innerHTML = "";
    setNewResources([]);
  }

  function addNewEvent(event) {
    event.preventDefault();

    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var startTime1 = (new Date(startTime - tzoffset)).toISOString().slice(0, -1);
    var endTime1 = (new Date(endTime - tzoffset)).toISOString().slice(0, -1);

    fetch(EVENTS_COLLISION_URL, {
      method: "POST",
      body: JSON.stringify({
        venueId: venue,
        timeFrom:
          props.session.date.split(" ")[0] +
          " " +
          startTime1.split("T")[1].replace("Z", "").slice(0, -4),
        timeTo:
          props.session.date.split(" ")[0] +
          " " +
          endTime1.split("T")[1].replace("Z", "").slice(0, -4),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length == 0) {
          //setCollisionCheck(false);

          const newEvent = {
            name: eventName,
            description: eventDescription,
            timeFrom:
              props.session.date.split(" ")[0] +
              " " +
              startTime1.split("T")[1].split(".")[0],
            timeTo:
              props.session.date.split(" ")[0] +
              " " +
              endTime1.split("T")[1].split(".")[0],
            isOnline: isOnline,
            sessionId: id2,
            eventTypeId: eventType,
            venueId: venue,
            userLecturerId: lecturer,
            userModeratorId: moderator,
            accessLink: accessLink,
            accessPassword: accessPassword,
          };
    
          if (props.isEdit) {
            newEvent.sessionId = props.session.sessionId;
          }
    
          /*if (isOnline) {
          newEvent.venueId = null;
          newEvent.accessLink = accessLink;
          newEvent.accessPassword = accessPassword;
        } else {
          newEvent.venueId = venue;
          newEvent.accessLink = null;
          newEvent.accessLink = null;
        }*/
    
          console.log("NEW EVENT", newEvent);
    
          if (props.isEdit) {
            fetch(EVENTS_URL + "/" + props.editId, {
              method: "PUT",
              body: JSON.stringify(newEvent),
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
              .catch((error) => {});
          } else {
            props.onAdd(newEvent, newResources);
          }
    
          setNewResources([]);

        } else {
          //setCollisionCheck(true);
          alert("Error, there was a collision with other termin");

        }
      });

    /*if (!collisionCheck) {
      
    } else {

    }*/
  }

  function onVenueChange(venue) {
    if (venue != null && venue != "") {
      document.getElementById("eventsInVenue").innerHTML = "";
      fetch(EVENTS_BY_VENUE_AND_DATE, {
        method: "POST",
        body: JSON.stringify({
          date: props.session.date,
          venueId: venue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setEventsByVenueAndDate(data);
          for (let i = 0; i < data.length; i++) {
            document.getElementById("eventsInVenue").innerHTML +=
              data[i].name +
              ": from " +
              data[i].timeFrom.split(" ")[1] +
              " to " +
              data[i].timeTo.split(" ")[1] +
              "\n";
          }
        });
    }
  }

  return (
    <Card>
      <h2 className={classes.title}>
        {props.isEdit ? "Edit event" : "Add new event"}
      </h2>
      <form className={classes.form} onSubmit={addNewEvent}>
        <div className={classes.control}>
          <label htmlFor="name">Event name</label>
          <input
            type="text"
            required
            id="name"
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Event description</label>
          <textarea
            required
            id="description"
            rows="5"
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="startTime">Start time</label>
          <DatePicker
            id="startTime"
            selected={startTime}
            onChange={(time) => {
              setStartTime(time);
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            timeFormat="HH:mm"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="startTime">End time</label>
          <DatePicker
            id="startTime"
            selected={endTime}
            onChange={(time) => {
              setEndTime(time);
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            timeFormat="HH:mm"
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
        <div className={classes.control}>
          <label htmlFor="lecturer">Lecturer</label>
          <select
            type="text"
            required
            id="lecturer"
            defaultValue=""
            onChange={(e) => setLecturer(e.target.value)}
          >
            <option value="" disabled>
              Select lecturer
            </option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>
                {lecturer.name} {lecturer.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="eventType">Event type</label>
          <select
            type="text"
            required
            id="eventType"
            defaultValue=""
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="" disabled>
              Select event type
            </option>
            {eventTypes.map((eventType) => (
              <option key={eventType.id} value={eventType.id}>
                {eventType.eventTypeName}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="is_online">Is event online</label>
          <select
            type="text"
            required
            id="account_type"
            defaultValue=""
            onChange={(e) => setIsOnline(e.target.value)}
          >
            <option value="" disabled>
              Select event type
            </option>
            <option value="false">Offline</option>
            <option value="true">Online</option>
          </select>
        </div>
        {isOnline === "false" ? (
          <div className={classes.control}>
            <label htmlFor="venue">Venue</label>
            <select
              type="text"
              required
              id="venue"
              defaultValue=""
              onChange={(e) => {
                setVenue(e.target.value);
                onVenueChange(e.target.value);
              }}
            >
              <option value="" disabled>
                Select venue
              </option>
              {venues.map((venue) => (
                <option key={venue.venueId} value={venue.venueId}>
                  {venue.name} - Number of places: {venue.numberOfPlaces}
                </option>
              ))}
            </select>
            <div className={classes.control}>
              <label htmlFor="eventsInVenue">
                Current events in selected venue
              </label>
              <textarea
                required
                id="eventsInVenue"
                rows="7"
                disabled
                className={classes.disabled}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {isOnline === "true" ? (
          <div>
            <div className={classes.control}>
              <label htmlFor="accessLink">Access link</label>
              <input
                type="text"
                required
                id="accessLink"
                onChange={(e) => setAccessLink(e.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="accessPassword">Access password</label>
              <input
                type="text"
                required
                id="accessPassword"
                onChange={(e) => setAccessPassword(e.target.value)}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {props.isEdit ? (
          ""
        ) : (
          <div>
            <div className={classes.control}>
              <label htmlFor="resource">Select resource</label>
              <select
                type="text"
                id="resource"
                defaultValue=""
                onChange={(e) => {
                  setNewResourceId(e.target.value);
                  setNewResourceName(
                    e.target.options[e.target.selectedIndex].text
                  );
                }}
              >
                <option value="" disabled>
                  Add resources
                </option>
                {resources.map((resource) => (
                  <option key={resource.resourceId} value={resource.resourceId}>
                    {resource.resourceType} - {resource.resourceName}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.control}>
              <label htmlFor="resourceAmount">Resource amount</label>
              <input
                type="number"
                id="resourceAmount"
                onChange={(e) => setResourceAmount(e.target.value)}
              />
            </div>
            <div className={classes.actions}>
              <button onClick={addResource}>Add resource</button>
              <button onClick={removeResources}>Clear resources</button>
            </div>
            <div className={classes.control}>
              <label htmlFor="resources">Added resources</label>
              <textarea
                required
                id="resources"
                rows="5"
                disabled
                className={classes.disabled}
              />
            </div>
          </div>
        )}
        <div className={classes.actions}>
          <button>{props.isEdit ? "Edit event" : "Add event"}</button>
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

export default NewEventForm;

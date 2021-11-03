import { useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import ConferenceContext from "../../store/context";
import classes from "./LogInForm.module.css";
import Card from "../ui/Card";

const LOGIN_URL = "http://localhost:9000/login";

const LogInForm = () => {
  const history = useHistory();

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const [loginTried, setLoginTried] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [unknownError, setUnknownError] = useState(false);

  const user = {
    username: "admin",
    password: "admin",
    userType: "moderator",
    userId: "id",
  };

  const conferenceCtx = useContext(ConferenceContext);

  function logIn(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword,
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
        conferenceCtx.addUser(data.id, data.username, data.userType);
        setLoginTried(true);
        setLoginSuccess(true);
        if (data.userType == "A") {
          history.replace("/locations");
        } else {
          history.replace("/");
        }
      })
      .catch((error) => {
        setLoginTried(true);
        if (error.message === "404") {
          setLoginSuccess(false);
        } else {
          setUnknownError(true);
        }
      });
  }

  return (
    <div>
      <Card>
        <form className={classes.form} onSubmit={logIn}>
          <div className={classes.control}>
            <label htmlFor="username">Username</label>
            <input type="text" required id="username" ref={usernameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              id="password"
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>Log in</button>
          </div>
          {loginTried
            ? loginSuccess
              ? ""
              : [
                  unknownError ? (
                    <div className={classes.actions}>
                      <label>Something went wrong. Try again.</label>
                    </div>
                  ) : (
                    <div className={classes.actions}>
                      <label>Log in failed. Try again.</label>
                    </div>
                  ),
                ]
            : ""}
        </form>
      </Card>
    </div>
  );
};

export default LogInForm;

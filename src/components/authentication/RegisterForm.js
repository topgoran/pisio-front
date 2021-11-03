import { useState } from 'react'
import classes from "./RegisterForm.module.css";
import Card from '../ui/Card'
import { Link } from 'react-router-dom';

const REGISTER_URL = 'http://localhost:9000/users';

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState("AT");

  const [registrationTried, setRegistrationTried] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(true);

  const [unknownError, setUnknownError] = useState(false);

  function registerUser(event){
    event.preventDefault();
    setRegistrationTried(true);

    if(accountType === "atendee"){
      setAccountType("AT");
    }else if(accountType === "moderator"){
      setAccountType("M");
    }else {
      setAccountType("L");
    }

    fetch(
      REGISTER_URL,
      {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
          name: firstName,
          lastName: lastName,
          userType: accountType

        }),
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(response => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
    }).then(data => {
      console.log(data);
      setRegistrationSuccess(true);
    }).catch((error) => {
      if(error.message === "409"){
        setRegistrationSuccess(false);
      }else{
        setRegistrationSuccess(false);
        setUnknownError(true);
      }
    });


  }

  return (
    <div>
      <Card>
        <form className={classes.form} onSubmit={registerUser}>
          <div className={classes.control}>
            <label htmlFor="username">Username</label>
            <input type="text" required id="username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" required id="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className={classes.control}>
            <label htmlFor="first_name">First name</label>
            <input type="text" required id="first_name" onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className={classes.control}>
            <label htmlFor="last_name">Last name</label>
            <input type="text" required id="last_name" onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className={classes.control}>
            <label htmlFor="account_type">Account type</label>
            <select type="text" required id="account_type" onChange={(e) => setAccountType(e.target.value)}>
              <option value="A">Atendee</option>
              <option value="L">Lecturer</option>
              <option value="M">Moderator</option>
            </select>
          </div>
          <div className={classes.actions}>
            <button>Register</button>
          </div>
          {
            registrationTried?
              registrationSuccess?
              <div className={classes.actions}>
                <Link to='/login'>Registration successful. Proceed to log in.</Link>
              </div>:
              unknownError?
              <div className={classes.actions}>
                <label>Something went wrong. Try again.</label>
              </div>
              :<div className={classes.actions}>
                <label>Registration failed, username already taken. Try again.</label>
              </div>
            :""
          }
        </form>
      </Card>
    </div>
  );
};

export default RegisterForm;

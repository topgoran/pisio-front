import { useContext } from "react";
import ConferenceContext from "../../store/context";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const conferenceCtx = useContext(ConferenceContext);

  function logOut() {
    conferenceCtx.removeUser();
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Conference manager</div>
      <nav>
        <ul>
          {conferenceCtx.userType != "A" ? (
            <li>
              <Link to="/">All conferences</Link>
            </li>
          ) : (
            ""
          )}
          {conferenceCtx.isLoggedIn() && conferenceCtx.userType != "A" ? (
            <li>
              <Link to="/responsibilities">My responsibilities</Link>
            </li>
          ) : (
            ""
          )}
          {conferenceCtx.isLoggedIn() ? (
            ""
          ) : (
            <li>
              <Link to="/login">Log in</Link>
            </li>
          )}
          {conferenceCtx.isLoggedIn() ? (
            ""
          ) : (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
          {conferenceCtx.isLoggedIn() && conferenceCtx.userType != "A" ? (
            <li>
              <Link to="/new-conference">New conference</Link>
            </li>
          ) : (
            ""
          )}
          {conferenceCtx.isLoggedIn() && conferenceCtx.userType != "A" ? (
            <li>
              <Link to="/my-conferences">My check ins</Link>
            </li>
          ) : (
            ""
          )}
          {conferenceCtx.isLoggedIn() && conferenceCtx.userType == "A" ? (
            <li>
              <Link to="/locations">Locations</Link>
            </li>
          ) : (
            ""
          )}
          {conferenceCtx.isLoggedIn() && conferenceCtx.userType == "A" ? (
            <li>
              <Link to="/venues">Venues</Link>
            </li>
          ) : (
            ""
          )}
          {conferenceCtx.isLoggedIn() && conferenceCtx.userType == "A" ? (
            <li>
              <Link to="/resources">Resources</Link>
            </li>
          ) : (
            ""
          )}
          {conferenceCtx.isLoggedIn() ? (
            <li>
              <span>Logged in as: {conferenceCtx.username}</span>
            </li>
          ) : (
            ""
          )}
          {conferenceCtx.isLoggedIn() ? (
            <li>
              <Link to="/" onClick={logOut}>
                Log out
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

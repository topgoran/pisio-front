import { Route, Switch } from "react-router-dom";
import AllConferences from "./pages/AllConferences";
import Conference from "./pages/Conference";
import NewConference from "./pages/NewConference";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Layout from "./components/layout/Layout";
import Session from "./pages/Session";
import UsersResponsibilities from "./pages/UsersResponsibilities";
import UsersConferences from "./pages/UsersConferences";
import EditConference from "./pages/EditConference";
import EditSession from "./pages/EditSession";
import EditEvent from "./pages/EditEvent";
import Locations from "./pages/Locations";
import Venues from "./pages/Venues";
import Resources from "./pages/Resources";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AllConferences />
        </Route>
        <Route path="/new-conference">
          <NewConference />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/conference/:id" exact>
          <Conference />
        </Route>
        <Route path="/conference/:id/:id2" exact>
          <Session />
        </Route>
        <Route path="/responsibilities/conference/:id/:id2">
          <Session />
        </Route>
        <Route path="/responsibilities" exact>
          <UsersResponsibilities />
        </Route>
        <Route path="/responsibilities/conference/:id">
          <Conference />
        </Route>
        <Route path="/my-conferences" exact>
          <UsersConferences />
        </Route>
        <Route path="/my-conferences/conference/:id" exact>
          <Conference />
        </Route>
        <Route path="/my-conferences/conference/:id/:id2">
          <Session />
        </Route>
        <Route path="/responsibilities/edit-conference/:id">
          <EditConference />
        </Route>
        <Route path="/responsibilities/edit-session/:id">
          <EditSession />
        </Route>
        <Route path="/responsibilities/edit-event/:id">
          <EditEvent />
        </Route>
        <Route path="/locations">
          <Locations />
        </Route>
        <Route path="/venues">
          <Venues />
        </Route>
        <Route path="/resources">
          <Resources />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

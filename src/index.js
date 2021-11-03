import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ConferenceContextProvider } from "./store/context";

ReactDOM.render(
  <ConferenceContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConferenceContextProvider>,
  document.getElementById("root")
);

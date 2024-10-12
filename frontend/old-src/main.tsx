import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { IconContext } from "react-icons";
import { Router } from "wouter";

import App from "./App";

/* render providers, app component */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <IconContext.Provider value={{}}>
        <Router>
          <App />
        </Router>
      </IconContext.Provider>
    </Provider>
  </StrictMode>,
);
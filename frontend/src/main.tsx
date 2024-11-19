import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { IconContext } from "react-icons";
import { Router } from "wouter";
import { WaitingPage } from "./pages/WaitingPage";

import { App } from "./app/App";

/* render providers, app component */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<WaitingPage />} persistor={persistor}>
        <IconContext.Provider value={{}}>
          <Router>
            <App />
          </Router>
        </IconContext.Provider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);

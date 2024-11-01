import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import LoadingPage from "./pages/LoadingPage";
import { IconContext } from "react-icons";
import { Router } from "wouter";

import App from "./app/App";
import ThemeManager from "./app/ThemeManager";

/* render providers, app component */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <IconContext.Provider value={{}}>
          <Router>
            <App />
            <ThemeManager />
          </Router>
        </IconContext.Provider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);

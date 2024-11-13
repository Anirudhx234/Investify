import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { IconContext } from "react-icons";
import { Router } from "wouter";
import WaitingPage from "./pages/WaitingPage";

import useThemeEffect from "./hooks/useThemeEffect";
import App from "./app/App";
import ToastProvider from "./components/Toast";

export function Investify() {
  useThemeEffect();
  return <App />;
}

/* render providers, app component */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<WaitingPage />} persistor={persistor}>
        <IconContext.Provider value={{}}>
          <Router>
            <ToastProvider>
              <Investify />
            </ToastProvider>
          </Router>
        </IconContext.Provider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);

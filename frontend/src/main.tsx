import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import App from "./app/App";

/* render providers, app component */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

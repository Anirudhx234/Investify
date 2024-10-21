/* types for app state */

import AppClient from "./AppClient";
import { AppRouteArgs } from "./AppRouter";

/* color theme, dark or light theme */
export interface ThemeState {
  mode: "light" | "dark";
}

/* args of the currently rendered route */
export interface AppRouteState {
  args: AppRouteArgs | null;
}

/* logged in client data */
export interface ClientState {
  loggedInClient: AppClient | null;
}

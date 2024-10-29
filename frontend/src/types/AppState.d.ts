/* types for app state */

import { AppRouteArgs } from "./AppRouter";

/* color theme, dark or light theme */
export interface ThemeState {
  mode: "light" | "dark";
}

/* args of the currently rendered route */
export interface AppRouteState {
  args: AppRouteArgs | null;
}

/* logged in client ID */
export interface ClientState {
  id: string | null;
}

/* search text on assets page */
export interface SearchState {
  searchValue: string;
}

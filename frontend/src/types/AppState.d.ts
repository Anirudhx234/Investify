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

/* user is logged in or not */
export interface AuthState {
  isAuth: boolean;
}

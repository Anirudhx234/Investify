/* types for app state */

import type * as routerTypes from "./router";

/* color theme, dark or light theme */
export interface Theme {
  mode: "light" | "dark";
}

/* args of the currently rendered route */
export interface Route {
  attributes: routerTypes.Route | null;
}

/* ID of the client currently logged in, null if logged out */
export interface Client {
  id: string | null;
}

/* search text on assets page */
export interface AssetsSearch {
  value: string;
}

/* alerts and toast */
export interface Alert {
  id: number;
  type: "success" | "loading" | "error";
  caption?: string | undefined;
}

export interface Toast {
  alerts: Alert[];
}

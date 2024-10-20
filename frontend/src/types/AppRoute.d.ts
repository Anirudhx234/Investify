import type { ReactNode } from "react";
import type { DrawerMode } from "./AppState";

export interface PageArgs {
  type: "page";
}

export interface VerificationArgs {
  type: "verification";
  method: "GET" | "PATCH";
  url: string;
}

export interface RedirectionArgs {
  type: "redirection";
  path: string;
}

export interface FormArgs {
  type: "form";
}

/* fields representing a top-level route in the app */
export interface AppRouteArgs {
  path: string;
  component: ReactNode;
  routeArgs: PageArgs | VerificationArgs | RedirectionArgs | FormArgs;
  label?: string | undefined; // human-readable route label
  nest?: boolean | undefined; // has sub-routes?
  drawerMode?: DrawerMode | undefined;
  navbar?: boolean | undefined; // route visible on navbar?
}

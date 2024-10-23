import type { ReactNode } from "react";

export interface PageArgs {
  type: "page";
}

export interface VerificationArgs {
  type: "verification";
  method: "PATCH";
  url: string;
}

export interface RedirectionArgs {
  type: "redirection";
  path: string;
}

export interface FormArgs {
  type: "form";
}

/*
 * disabled - no drawer
 * enabled - open burger on navbar
 * open - open by default, fallback to enabled on small screens
 */
export type DrawerMode = "disabled" | "enabled" | "open";

/* fields representing a top-level route in the app */
export interface AppRouteArgs {
  path: string;
  routeArgs: PageArgs | VerificationArgs | RedirectionArgs | FormArgs;
  protection?: "signed-in" | "signed-out" | "none" | undefined;
  label?: string | undefined; // human-readable route label
  nest?: boolean | undefined; // has sub-routes?
  drawerMode?: DrawerMode | undefined;
  navbar?: boolean | undefined; // route visible on navbar?
}

export interface AppPage extends AppRouteArgs {
  component?: ReactNode | undefined;
}

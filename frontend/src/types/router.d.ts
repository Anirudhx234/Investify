import type { FieldValues } from "react-hook-form";
import type * as formTypes from "./form";
import type { ReactNode } from "react";

/* fields representing a top-level route in the app */

export interface PageArgs {
  type: "page";
}

/* form attributes given here for convenience */
export interface VerificationArgs<T extends FieldValues = FieldValues> {
  type: "verification";
  url: string;
  method: "GET" | "PATCH";
  form?: formTypes.Form<T> | undefined;
}

export interface RedirectionArgs {
  type: "redirection";
  path: string;
}

/*
 * form attributes not given here to avoid clutter
 * perform all form functionality in a component under forms folder
 */
export interface FormArgs {
  type: "form";
}

/*
 * disabled - no drawer
 * enabled - open burger on navbar
 * open - open by default, fallback to enabled on small screens
 */
export type DrawerMode = "disabled" | "enabled" | "open";

export interface Route<T extends FieldValues = FieldValues> {
  path: string;
  args: PageArgs | VerificationArgs<T> | RedirectionArgs | FormArgs;
  protection?: "signed-in" | "signed-out" | "none" | undefined;
  label?: string | undefined; // human-readable route label
  nest?: boolean | undefined; // has sub-routes?
  drawerMode?: DrawerMode | undefined;
  navbar?: boolean | undefined; // route visible on navbar?
}

export interface Page extends Route {
  component?: ReactNode | undefined;
}

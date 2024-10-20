/* types for app state */

/* color theme, dark or light theme */
export interface ThemeState {
  mode: "light" | "dark";
}

/*
 * disabled - no drawer
 * enabled - open burger on navbar
 * open - open by default, fallback to enabled on small screens
 */
export type DrawerMode = "disabled" | "enabled" | "open";

export interface DrawerState {
  mode: DrawerMode;
}

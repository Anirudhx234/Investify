import type DrawerState from "../types/DrawerState";

import { useLocation } from "wouter";

export default function useDrawer(): DrawerState {
  const [location] = useLocation();

  if (location === "/create-account") return { mode: "disabled" };
  if (location === "/login") return { mode: "disabled" };
  if (location === "/assets") return { mode: "disabled" };
  return { mode: "enabled" };
}

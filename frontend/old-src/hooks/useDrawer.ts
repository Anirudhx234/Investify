import type DrawerState from "../types/DrawerState";

import { useLocation } from "wouter";

export default function useDrawer(): DrawerState {
  const [location] = useLocation();

  if (location.startsWith("/create-account")) return { mode: "disabled" };
  if (location.startsWith("/login")) return { mode: "disabled" };
  if (location.startsWith("/assets/asset-page"))
    return { mode: "open-enabled" };
  if (location.startsWith("/assets")) return { mode: "disabled" };
  if (location.startsWith("/not-found")) return { mode: "disabled" };

  return { mode: "enabled" };
}

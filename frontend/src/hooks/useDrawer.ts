import type { DrawerMode } from "../types/AppState";

import { useEffect } from "react";
import useAppDispatch from "./useAppDispatch";
import { setDrawer } from "../features/drawerSlice";

export default function useDrawer(mode: DrawerMode) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDrawer(mode));

    return () => {
      dispatch(setDrawer("disabled"));
    };
  }, [dispatch, mode]);
}

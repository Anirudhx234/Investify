import { useEffect } from "react";
import { useAppSelector } from "./useAppSelector";

export function useThemeEffect() {
  const themeMode = useAppSelector((state) => state.theme.mode);
  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);
}

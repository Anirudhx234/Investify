import { useEffect } from "react";
import useAppSelector from "../hooks/useAppSelector";

export default function ThemeManager() {
  const themeMode = useAppSelector((state) => state.theme.mode);
  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  return <></>;
}

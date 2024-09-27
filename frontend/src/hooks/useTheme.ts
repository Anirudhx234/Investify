import { useEffect } from "react";
import useAppSelector from "./useAppSelector";

export default function useTheme() {
  const mode = useAppSelector((state) => state.theme.mode);
  useEffect(() => {
    if (mode === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [mode]);
}

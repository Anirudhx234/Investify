import { useEffect } from "react";
import useAppSelector from "./useAppSelector";

export default function useTheme() {
  const mode = useAppSelector((state) => state.theme.mode);
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);
}

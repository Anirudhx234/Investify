import useAppSelector from "../hooks/useAppSelector";
import { useEffect } from "react";

export default function App() {
  const themeMode = useAppSelector((state) => state.theme.mode);
  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  return <>Hello World!</>;
}

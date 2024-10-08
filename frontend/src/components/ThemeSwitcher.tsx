import { FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "../features/themeSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";

export default function ThemeSwitcher() {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  return (
    <button
      className="btn btn-square btn-ghost ~text-lg/xl"
      onClick={() => dispatch(toggleTheme())}
    >
      {themeMode === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}

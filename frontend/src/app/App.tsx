import useAppSelector from "../hooks/useAppSelector";
import { useEffect } from "react";
import twMerge from "../util/twMerge";
import AppRouter from "./AppRouter";

export default function App() {
  const themeMode = useAppSelector((state) => state.theme.mode);
  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  const drawerMode = useAppSelector((state) => state.drawer.mode);

  return (
    <div
      className={twMerge("drawer", drawerMode === "open" && "lg:drawer-open")}
    >
      <input className="drawer-toggle" id="drawer" type="checkbox" />
      <div className="drawer-content">
        <header className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 text-base-content shadow-sm backdrop-blur"></header>
        <main className="flex max-w-[100vw] flex-col items-start justify-start px-6 py-8 text-base-content">
          <AppRouter />
        </main>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="drawer"
          className="drawer-overlay"
          aria-label="Close Menu"
        ></label>
      </div>
    </div>
  );
}

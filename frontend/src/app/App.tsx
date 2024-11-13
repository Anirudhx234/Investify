import AppSidebar from "./AppSidebar";
import AppRouter from "./AppRouter";
import Navbar from "../scenes/Navbar";
import useAppSelector from "../hooks/useAppSelector";
import { twMerge } from "tailwind-merge";

export default function App() {
  const drawerMode = useAppSelector(
    (state) => state.route.attributes?.drawerMode,
  );

  return (
    <div
      className={twMerge("drawer", drawerMode === "open" && "lg:drawer-open")}
    >
      <input className="drawer-toggle" id="drawer" type="checkbox" />
      <div className="drawer-content">
        <div className="flex h-screen w-full flex-col">
          <header className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 text-base-content shadow-sm backdrop-blur">
            <Navbar />
          </header>
          <main className="flex h-full w-full max-w-[100vw] flex-1 flex-col items-start justify-start overflow-y-auto py-8 text-base-content ~px-2/6">
            <AppRouter />
          </main>
        </div>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="drawer"
          className="drawer-overlay"
          aria-label="Close Menu"
        ></label>
        <AppSidebar />
      </div>
    </div>
  );
}

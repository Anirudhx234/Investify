import useAppSelector from "../hooks/useAppSelector";
import twMerge from "../util/twMerge";
import AppRouter from "./AppRouter";
import Navbar from "../scenes/Navbar";
import AppSidebar from "./AppSidebar";

export default function App() {
  const drawerMode = useAppSelector((state) => state.appRoute.args?.drawerMode);

  return (
    <div
      className={twMerge("drawer", drawerMode === "open" && "lg:drawer-open")}
    >
      <input className="drawer-toggle" id="drawer" type="checkbox" />
      <div className="drawer-content">
        <div className="flex flex-col h-screen">
          <header className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 text-base-content shadow-sm backdrop-blur">
            <Navbar />
          </header>
          <main className="flex-1 overflow-y-auto flex w-full max-w-[100vw] flex-col items-start justify-start ~px-2/6 py-8 text-base-content">
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

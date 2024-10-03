import Logo from "../components/Logo";
import useDrawer from "../hooks/useDrawer";

export default function Sidebar() {
  const drawer = useDrawer();

  return (
    <aside className="min-h-screen w-72 border-r-2 border-r-base-300 bg-base-100">
      {drawer.mode === "open-enabled" && (
        <div className="sticky top-0 z-20 hidden items-center gap-2 bg-base-100 bg-opacity-90 p-4 shadow-sm backdrop-blur lg:flex">
          <Logo />
        </div>
      )}
    </aside>
  );
}

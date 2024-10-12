import Logo from "../components/Logo";
import useDrawer from "../hooks/useDrawer";

export default function Sidebar() {
  const drawer = useDrawer();

  return (
    <aside className="min-h-screen w-72 scroll-pt-20 scroll-smooth bg-base-100">
      {drawer.mode === "open-enabled" && (
        <div className="sticky top-0 z-20 hidden h-16 items-center gap-2 bg-base-100 bg-opacity-90 p-4 shadow-sm backdrop-blur lg:flex">
          <Logo />
        </div>
      )}
      <div className="h-4"></div>
      <ul className="menu px-4 py-0"></ul>
    </aside>
  );
}

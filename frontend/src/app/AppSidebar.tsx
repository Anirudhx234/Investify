import ClientSidebar from "../scenes/ClientSidebar";
import HomeSidebar from "../scenes/HomeSidebar";
import Logo from "../components/Logo";
import useAppSelector from "../hooks/useAppSelector";
import { Route, Switch } from "wouter";

const sidebarRoutes = [
  { path: "/clients/me", component: ClientSidebar, nest: true },
  { path: "/clients/:id", component: ClientSidebar, nest: true },
  { path: "/assets", component: HomeSidebar, nest: true },
];

export default function AppSidebar() {
  const drawerMode = useAppSelector(
    (state) => state.route.attributes?.drawerMode,
  );

  return (
    <aside className="min-h-screen w-72 scroll-pt-20 scroll-smooth bg-base-100">
      {drawerMode === "open" && (
        <div className="sticky top-0 z-20 hidden h-16 items-center gap-2 bg-base-100 bg-opacity-90 p-4 shadow-sm backdrop-blur lg:flex">
          <Logo />
        </div>
      )}
      <div className="h-4"></div>
      <div className="flex flex-col items-center px-2">
        <Switch>
          {sidebarRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </div>
    </aside>
  );
}

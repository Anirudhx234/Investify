import { Route, Switch } from "wouter";
import Logo from "../components/Logo";
import useAppSelector from "../hooks/useAppSelector";
import ClientsSidebar from "../scenes/ClientsSidebar";

const sidebarRoutes = {
  "/clients/:id": { component: ClientsSidebar, nest: true },
};

export default function AppSidebar() {
  const drawerMode = useAppSelector((state) => state.appRoute.args?.drawerMode);

  return (
    <aside className="min-h-screen w-72 scroll-pt-20 scroll-smooth bg-base-100">
      {drawerMode === "open" && (
        <div className="sticky top-0 z-20 hidden h-16 items-center gap-2 bg-base-100 bg-opacity-90 p-4 shadow-sm backdrop-blur lg:flex">
          <Logo />
        </div>
      )}
      <div className="h-4"></div>
      <Switch>
        {Object.entries(sidebarRoutes).map(([key, value]) => (
          <Route key={key} path={key} {...value} />
        ))}
      </Switch>
    </aside>
  );
}

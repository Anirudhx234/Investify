import { Route, Switch } from "wouter";
import Logo from "../components/Logo";
import useAppSelector from "../hooks/useAppSelector";
import ClientsSidebar from "../scenes/ClientsSidebar";
import AssetsSidebar from "../scenes/AssetsSidebar";
import PortfolioAssetForm from "../forms/PortfolioAssetForm";

const sidebarRoutes = {
  "/clients/:id": { component: ClientsSidebar, nest: true },
  "/assets": { component: AssetsSidebar, nest: true },
  "/portfolio": { component: PortfolioAssetForm },
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
      <div className="flex flex-col items-center px-2">
        <Switch>
          {Object.entries(sidebarRoutes).map(([key, value]) => (
            <Route key={key} path={key} {...value} />
          ))}
        </Switch>
      </div>
    </aside>
  );
}

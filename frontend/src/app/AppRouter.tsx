import type { AppRouteArgs } from "../types/AppRoute";
import { Redirect, Route, Switch } from "wouter";
import appRoutes from "./appRoutes";
import useDrawer from "../hooks/useDrawer";
import VerificationPage from "../pages/VerificationPage";

/* component for rendering top-level routes in the app */
export default function AppRouter() {
  return (
    <Switch>
      <>
        {appRoutes.map((appRoute) => (
          <AppRoute key={appRoute.path} {...appRoute} />
        ))}
      </>
    </Switch>
  );
}

function AppRoute({ ...appRoute }: AppRouteArgs) {
  return (
    <Route
      path={appRoute.path}
      nest={appRoute.nest}
      component={() => <AppRouteComponent {...appRoute} />}
    />
  );
}

function AppRouteComponent({ ...appRoute }: AppRouteArgs) {
  useDrawer(appRoute.drawerMode ?? "disabled");

  if (appRoute.routeArgs.type === "redirection") {
    return <Redirect to={appRoute.routeArgs.path} />;
  }

  if (appRoute.routeArgs.type === "verification") {
    return <VerificationPage {...appRoute.routeArgs} />;
  }

  return appRoute.component;
}

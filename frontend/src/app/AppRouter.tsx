import type { AppPage } from "../types/AppRouter";

import { Redirect, Route, Switch } from "wouter";
import appPages from "./appPages";
import VerificationPage from "../pages/VerificationPage";
import { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { setAppRouteArgs } from "../features/appRouteSlice";
import useAppSelector from "../hooks/useAppSelector";

/* component for rendering top-level routes in the app */
export default function AppRouter() {
  return (
    <Switch>
      <>
        {appPages.map((appPage) => (
          <AppPage key={appPage.path} {...appPage} />
        ))}
      </>
    </Switch>
  );
}

function AppPage({ ...appPage }: AppPage) {
  return (
    <Route
      path={appPage.path}
      nest={appPage.nest}
      component={() => <AppPageComponent {...appPage} />}
    />
  );
}

function AppPageComponent({ ...appPage }: AppPage) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.client.loggedInClient !== null);

  useEffect(() => {
    const appRoute = { ...appPage, component: undefined };

    dispatch(setAppRouteArgs(appRoute));

    return () => {
      dispatch(setAppRouteArgs(null));
    };
  }, [dispatch, appPage]);

  if (appPage.routeArgs.type === "redirection") {
    return <Redirect to={appPage.routeArgs.path} />;
  }

  if (appPage.routeArgs.type === "verification") {
    return <VerificationPage {...appPage.routeArgs} />;
  }

  if (appPage.protection === "signed-in" && !auth) {
    return <Redirect to="/" />;
  }

  if (appPage.protection === "signed-out" && auth) {
    return <Redirect to="/" />;
  }

  return appPage.component;
}

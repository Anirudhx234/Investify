import type { AppPage } from "../types/AppRouter";

import { Redirect, Route, Switch, useLocation } from "wouter";
import appPages from "./appPages";
import VerificationPage from "../pages/VerificationPage";
import { useEffect, useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { setAppRouteArgs } from "../features/appRouteSlice";
import useAppSelector from "../hooks/useAppSelector";

/* component for rendering top-level routes in the app */
export default function AppRouter() {
  return (
    <Switch>
      {appPages.map((appPage) => (
        <AppPage key={appPage.path} {...appPage} />
      ))}
    </Switch>
  );
}

function AppPage({ ...appPage }: AppPage) {
  const auth = useAppSelector((state) => state.client.id !== null);
  const [prevAuth, setPrevAuth] = useState(auth);
  const [, navigate] = useLocation();

  if (prevAuth !== auth) {
    setPrevAuth(auth);
    if (appPage.protection === "signed-in" && !auth) navigate("/");
    if (appPage.protection === "signed-out" && auth) navigate("/");
  }

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

  useEffect(() => {
    const appRoute = { ...appPage, component: undefined };

    dispatch(setAppRouteArgs(appRoute));

    return () => {
      dispatch(setAppRouteArgs(null));
    };
  }, [dispatch, appPage]);

  if (appPage.routeArgs.type === "redirection") {
    return <Redirect to={appPage.routeArgs.path} replace />;
  }

  if (appPage.routeArgs.type === "verification") {
    return <VerificationPage {...appPage.routeArgs} />;
  }

  if (appPage.routeArgs.type === "form") {
    return (
      <div className="flex w-full justify-center">
        <div className="w-full max-w-lg">{appPage.component}</div>
      </div>
    );
  }

  return appPage.component;
}

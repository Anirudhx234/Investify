import { routerTypes } from "../types";

import { Redirect, Route, Switch } from "wouter";
import { pages } from "./pages";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useToast } from "../hooks/useToast";
import { selectIsLoggedIn } from "../features/clientSlice";
import { memo, useEffect } from "react";
import { setRouteAttributes } from "../features/routeSlice";
import { VerificationPage } from "../pages/VerificationPage";

/* component for rendering top-level routes in the app */
export const AppRouter = memo(function AppRouter() {
  return (
    <Switch>
      {pages.map((page) => (
        <Page key={page.path} {...page} />
      ))}
    </Switch>
  );
});

export function Page({ ...page }: routerTypes.Page) {
  return (
    <Route
      path={page.path}
      nest={page.nest}
      component={() => <PageComponent {...page} />}
    />
  );
}

export function PageComponent({ ...page }: routerTypes.Page) {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const toast = useToast();

  useEffect(() => {
    const route = { ...page, component: undefined };
    dispatch(setRouteAttributes(route));
    return () => {
      dispatch(setRouteAttributes(null));
    };
  }, [page, dispatch]);

  useEffect(() => {
    if (page.protection === "signed-in" && !isLoggedIn) {
      toast.createErrorAlert({
        caption: "Please login to visit this page",
      });
    }
    if (page.protection === "signed-out" && isLoggedIn) {
      toast.createErrorAlert({ caption: "You are logged in" });
    }
  }, [page, isLoggedIn, toast]);

  if (page.protection === "signed-in" && !isLoggedIn)
    return <Redirect to="~/" replace />;

  if (page.protection === "signed-out" && isLoggedIn)
    return <Redirect to="~/" replace />;

  if (page.args.type === "redirection")
    return <Redirect to={`~${page.args.path}`} replace />;

  if (page.args.type === "verification")
    return <VerificationPage {...page.args} />;

  if (page.args.type === "form") {
    return (
      <div className="flex w-full justify-center">
        <div className="w-full max-w-lg">{page.component}</div>
      </div>
    );
  }

  return page.component;
}

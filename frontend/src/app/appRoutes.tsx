import type { AppRouteArgs } from "../types/AppRoute";
import CreateAccountForm from "../forms/CreateAccountForm";
import LoginForm from "../forms/LoginForm";

/* list of top-level routes for the app */
const appRoutes: AppRouteArgs[] = [
  {
    path: "/sign-up",
    component: <CreateAccountForm />,
    routeArgs: { type: "form" },
    label: "Sign Up",
  },
  {
    path: "/login",
    component: <LoginForm />,
    routeArgs: { type: "form" },
    label: "Sign Up",
  },
];

export default appRoutes;

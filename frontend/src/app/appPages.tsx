import type { AppPage } from "../types/AppRouter";
import CreateAccountForm from "../forms/CreateAccountForm";
import LoginForm from "../forms/LoginForm";
import NotFoundPage from "../pages/NotFoundPage";

/* list of top-level routes for the app */
export const appPages: AppPage[] = [
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
  {
    path: "*",
    component: <NotFoundPage />,
    routeArgs: { type: "page" },
  },
];

export default appPages;

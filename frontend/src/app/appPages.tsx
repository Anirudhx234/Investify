import type { AppPage } from "../types/AppRouter";

import SignUpForm from "../forms/SignUpForm";
import LoginForm from "../forms/LoginForm";
import NotFoundPage from "../pages/NotFoundPage";
import ClientsPage from "../pages/ClientsPage";

/* list of top-level routes for the app */
export const appPages: AppPage[] = [
  {
    path: "/sign-up",
    component: <SignUpForm />,
    routeArgs: { type: "form" },
    label: "Sign Up",
    protection: "signed-out",
  },
  {
    path: "/verify-email",
    routeArgs: { type: "verification", method: "PATCH", url: "/verify-email" },
  },
  {
    path: "/login",
    component: <LoginForm />,
    routeArgs: { type: "form" },
    label: "Login",
    protection: "signed-out",
  },
  {
    path: "/clients/:id",
    component: <ClientsPage />,
    routeArgs: { type: "form" },
    label: "Clients",
    nest: true,
    drawerMode: "open",
  },
  {
    path: "/",
    routeArgs: { type: "redirection", path: "/home" },
  },
  {
    path: "*",
    component: <NotFoundPage />,
    routeArgs: { type: "page" },
  },
];

export default appPages;

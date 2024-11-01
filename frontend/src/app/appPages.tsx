import type { AppPage } from "../types/AppRouter";

import SignUpForm from "../forms/SignUpForm";
import LoginForm from "../forms/LoginForm";
import NotFoundPage from "../pages/NotFoundPage";
import ClientsPage from "../pages/ClientsPage";
import AssetsPage from "../pages/AssetsPage";
import HomePage from "../pages/HomePage";
import PortfolioPage from "../pages/PortfolioPage";

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
    routeArgs: { type: "verification", method: "GET", url: "/auth/verify-email" },
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
    protection: "signed-in",
  },
  {
    path: "/home",
    component: <HomePage />,
    routeArgs: { type: "page" },
    label: "Home",
    navbar: true,
  },
  {
    path: "/assets",
    component: <AssetsPage />,
    routeArgs: { type: "page" },
    label: "Assets",
    nest: true,
    drawerMode: "open",
    navbar: true,
  },
  {
    path: "/portfolio",
    component: <PortfolioPage />,
    routeArgs: { type: "page" },
    label: "Portfolio",
    drawerMode: "open",
    navbar: true,
    protection: "signed-in",
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

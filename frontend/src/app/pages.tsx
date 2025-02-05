import type { routerTypes } from "../types";

import { SignUpForm } from "../forms/SignUpForm";
import { LoginForm } from "../forms/LoginForm";
import { ForgotPasswordForm } from "../forms/ForgotPasswordForm";
import { ClientPage } from "../pages/ClientPage";
import { HomePage } from "../pages/HomePage";
import { PortfoliosPage } from "../pages/PortfoliosPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ResetPasswordForm } from "../forms/ResetPasswordForm";
import { AssetPage } from "../pages/AssetPage";
import { GamesPage } from "../pages/GamesPage";
import { SocialPage } from "../pages/SocialPage";

/* list of top-level routes for the app */
export const pages: routerTypes.Page[] = [
  {
    path: "/sign-up",
    component: <SignUpForm />,
    args: { type: "form" },
    label: "Sign Up",
    protection: "signed-out",
  },
  {
    path: "/verify-email",
    args: {
      type: "verification",
      url: "/auth/verify-email",
    },
  },
  {
    path: "/login",
    component: <LoginForm />,
    args: { type: "form" },
    label: "Login",
    protection: "signed-out",
  },
  {
    path: "/forgot-password",
    component: <ForgotPasswordForm />,
    args: { type: "form" },
    label: "Login",
    protection: "signed-out",
  },
  {
    path: "/reset-password",
    component: <ResetPasswordForm />,
    args: { type: "form" },
    label: "Login",
    protection: "signed-out",
  },
  {
    path: "/clients/me",
    component: <ClientPage />,
    args: { type: "form" },
    label: "Client",
    nest: true,
    drawerMode: "open",
    protection: "signed-in",
  },
  {
    path: "/clients/:id",
    component: <ClientPage />,
    args: { type: "form" },
    label: "Client",
    nest: true,
    drawerMode: "open",
    protection: "none",
  },
  {
    path: "/home",
    component: <HomePage />,
    args: { type: "page" },
    label: "Home",
    navbar: true,
  },
  {
    path: "/assets/:type/:symbol",
    component: <AssetPage />,
    args: { type: "page" },
    label: "Assets",
    drawerMode: "open",
    nest: true,
  },
  {
    path: "/portfolios",
    component: <PortfoliosPage />,
    args: { type: "page" },
    label: "Portfolio",
    drawerMode: "open",
    navbar: true,
    protection: "signed-in",
    nest: true,
  },
  {
    path: "/games",
    component: <GamesPage />,
    args: { type: "page" },
    label: "Games",
    drawerMode: "open",
    navbar: true,
    nest: true,
    protection: "signed-in",
  },
  {
    path: "/social",
    component: <SocialPage />,
    args: { type: "page" },
    label: "Social",
    navbar: true,
    protection: "signed-in",
    nest: true,
  },
  {
    path: "/",
    args: { type: "redirection", path: "/home" },
  },
  {
    path: "*",
    component: <NotFoundPage />,
    args: { type: "page" },
  },
];

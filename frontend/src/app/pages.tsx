import type { routerTypes } from "../types";

import { SignUpForm } from "../forms/SignUpForm";
import { LoginForm } from "../forms/LoginForm";
import { ForgotPasswordForm } from "../forms/ForgotPasswordForm";
import { ClientPage } from "../pages/ClientPage";
import { HomePage } from "../pages/HomePage";
import { PortfolioPage } from "../pages/PortfolioPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ResetPasswordForm } from "../forms/ResetPasswordForm";

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
    path: "/portfolio",
    component: <PortfolioPage />,
    args: { type: "page" },
    label: "Portfolio",
    drawerMode: "open",
    navbar: true,
    protection: "signed-in",
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

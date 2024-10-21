import type { AppPage } from "../types/AppRouter";
import SignUpForm from "../forms/SignUpForm";
import LoginForm from "../forms/LoginForm";
import NotFoundPage from "../pages/NotFoundPage";

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
    path: "/login",
    component: <LoginForm />,
    routeArgs: { type: "form" },
    label: "Login",
    protection: "signed-out",
  },
  {
    path: "*",
    component: <NotFoundPage />,
    routeArgs: { type: "page" },
  },
];

export default appPages;

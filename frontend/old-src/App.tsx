import { Redirect, Route, Switch } from "wouter";
import useTheme from "./hooks/useTheme";
import useDrawer from "./hooks/useDrawer";
import twMerge from "./utils/twMerge";
import Navbar from "./scenes/Navbar";
import Sidebar from "./scenes/Sidebar";
import CreateAccountRoute from "./routes/CreateAccountRoute";
import NotFoundRoute from "./routes/NotFoundRoute";
import HomeRoute from "./routes/HomeRoute";
import AssetsRoute from "./routes/AssetsRoute";
import LoginRoute from "./routes/LoginRoute";
import ProfileRoute from "./routes/ProfileRoute";
import VerifyAccountRoute from "./routes/VerifyAccountRoute";
import VerifyNewEmailRoute from "./routes/VerifyNewEmailRoute";
import ForgotPasswordRoute from "./routes/ForgotPasswordRoute";
import ResetPasswordRoute from "./routes/ResetPasswordRoute";

export default function App() {
  useTheme();
  const drawer = useDrawer();

  return (
    <div
      className={twMerge(
        "drawer",
        drawer.mode === "open-enabled" && "lg:drawer-open",
      )}
    >
      <input className="drawer-toggle" id="drawer" type="checkbox" />
      <div className="drawer-content">
        <header className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 text-base-content shadow-sm backdrop-blur">
          <Navbar />
        </header>
        <main className="flex max-w-[100vw] flex-col items-start justify-start px-6 py-8 text-base-content">
          <Switch>
            <Route path="/create-account" component={CreateAccountRoute} />
            <Route path="/verify-email" component={VerifyAccountRoute} />
            <Route path="/login" component={LoginRoute} />
            <Route path="/home" component={HomeRoute} />
            <Route path="/profile" component={ProfileRoute} />
            <Route path="/verify-new-email" component={VerifyNewEmailRoute} />
            <Route path="/forgot-password" component={ForgotPasswordRoute} />
            <Route path="/reset-password" component={ResetPasswordRoute} />
            <Route path="/assets" component={AssetsRoute} nest />
            <Route path="/" component={() => <Redirect to="/home" replace />} />
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="drawer"
          className="drawer-overlay"
          aria-label="Close Menu"
        ></label>
        <Sidebar />
      </div>
    </div>
  );
}
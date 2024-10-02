import { Redirect, Route, Switch } from "wouter";
import useTheme from "./hooks/useTheme";
import Navbar from "./scenes/Navbar";
import Sidebar from "./scenes/Sidebar";
import CreateAccountRoute from "./routes/CreateAccountRoute";
import NotFoundRoute from "./routes/NotFoundRoute";
import HomeRoute from "./routes/HomeRoute";

export default function App() {
  useTheme();

  return (
    <div className="drawer">
      <input className="drawer-toggle" id="drawer" type="checkbox" />
      <div className="drawer-content">
        <header>
          <Navbar />
        </header>
        <main className="flex max-w-[100vw] flex-col items-start justify-start px-6 py-16 text-base-content">
          <Switch>
            <Route path="/create-account" component={CreateAccountRoute} />
            <Route path="/home" component={HomeRoute} />
            <Route path="/" component={() => <Redirect to="/home" />} />
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

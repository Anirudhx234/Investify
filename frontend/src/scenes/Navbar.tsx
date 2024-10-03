import Logo from "../components/Logo";
import useDrawer from "../hooks/useDrawer";
import { Link, useLocation } from "wouter";
import DrawerBurger from "../components/DrawerBurger";
import { IoMdArrowDropdown } from "react-icons/io";

function routeToText(route: string) {
  return route.substring(1).replace("-", " ");
}

export default function Navbar() {
  const drawer = useDrawer();
  const [location] = useLocation();

  return (
    <nav className="navbar w-full">
      <div className="navbar-start gap-1">
        <DrawerBurger />
        <div className={drawer.mode === "open-enabled" ? "lg:hidden" : ""}>
          <Logo />
        </div>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 flex items-center gap-1 capitalize"
          >
            {routeToText(location)}
            <IoMdArrowDropdown />
          </div>
          <ul
            tabIndex={0}
            className="z-1 menu dropdown-content rounded-box bg-base-100 p-2 shadow"
          >
            <Sitemap />
          </ul>
        </div>
        <ul className="hidden lg:flex">
          <Sitemap />
        </ul>
      </div>
    </nav>
  );
}

function Sitemap() {
  const routes = ["/assets", "/portfolio", "/projections", "/competitions"];

  return (
    <>
      {routes.map((route) => (
        <li key={route}>
          <Link
            to={route}
            className="btn btn-ghost cursor-pointer font-normal capitalize"
          >
            {routeToText(route)}
          </Link>
        </li>
      ))}
    </>
  );
}

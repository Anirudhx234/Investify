import Logo from "../components/Logo";
import useDrawer from "../hooks/useDrawer";
import { useLocation } from "wouter";
import DrawerBurger from "../components/DrawerBurger";
import { IoMdArrowDropdown } from "react-icons/io";
import ThemeSwitcher from "../components/ThemeSwitcher";
import routeToText from "../utils/routeToText";
import NavLink from "../components/NavLink";
import NavProfileLink from "../components/NavProfileLink";

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
      <div className="navbar-end flex items-center">
        <ThemeSwitcher />
        <div className="dropdown dropdown-end lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 flex items-center gap-1 capitalize flex-nowrap"
          >
            {routeToText(location)}
            <IoMdArrowDropdown />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-1 rounded-box bg-base-200 p-2 shadow"
          >
            <Sitemap />
          </ul>
        </div>
        <ul className="hidden lg:flex">
          <Sitemap />
        </ul>
        {/* <NavProfileLink /> */}
      </div>
    </nav>
  );
}

function Sitemap() {
  const routes = [
    "/home",
    "/assets",
    "/portfolio",
    "/projections",
    "/competitions"
  ];

  return (
    <>
      {routes.map((route) => (
        <li key={route}>
          <NavLink route={route} />
        </li>
      ))}
    </>
  );
}

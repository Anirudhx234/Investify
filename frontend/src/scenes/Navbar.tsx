import type { AppRouteArgs } from "../types/AppRouter";

import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../components/Logo";
import useAppSelector from "../hooks/useAppSelector";
import twMerge from "../util/twMerge";
import useAppDispatch from "../hooks/useAppDispatch";
import { toggleTheme } from "../features/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import appRoutes from "../app/appPages";
import { Link } from "wouter";
import ProfilePicture from "../components/ProfilePicture";

export default function Navbar() {
  const drawerMode = useAppSelector((state) => state.appRoute.args?.drawerMode);
  const loggedInClientId = useAppSelector((state) => state.client.id);

  return (
    <nav className="navbar w-full">
      <div className="navbar-start gap-1">
        <DrawerMenu />
        <div className={twMerge(drawerMode === "open" && "lg:hidden")}>
          <Logo />
        </div>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <ThemeSwitcher />
        <MobileDropdown />
        <ul className="hidden lg:flex">
          <NavLinks />
        </ul>
        {loggedInClientId !== null ? (
          <ProfilePicture src={{ id: loggedInClientId }} />
        ) : (
          <Link href="/login" className="btn btn-secondary btn-sm">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

function DrawerMenu() {
  const drawerMode = useAppSelector((state) => state.appRoute.args?.drawerMode);

  return (
    <label
      aria-label="Open Menu"
      htmlFor="drawer"
      className={twMerge(
        "btn btn-square btn-ghost drawer-button ~text-lg/xl",
        !drawerMode && "hidden",
        drawerMode === "disabled" && "hidden",
        drawerMode === "open" && "lg:hidden",
      )}
    >
      <GiHamburgerMenu />
    </label>
  );
}

function ThemeSwitcher() {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  return (
    <button
      className="btn btn-square btn-ghost ~text-lg/xl"
      onClick={() => dispatch(toggleTheme())}
    >
      {themeMode === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}

function MobileDropdown() {
  const label = useAppSelector((state) => state.appRoute.args?.label);

  return (
    <div className="dropdown dropdown-end lg:hidden">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 flex flex-nowrap items-center gap-1 capitalize"
      >
        {label ?? "Investify"}
        <IoMdArrowDropdown />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-1 rounded-box bg-base-200 p-2 shadow"
      >
        <NavLinks />
      </ul>
    </div>
  );
}

function NavLinks() {
  return (
    <>
      {appRoutes
        .filter((appRoute) => appRoute.navbar)
        .map((appRoute) => (
          <li key={appRoute.path}>
            <NavLink {...appRoute} />
          </li>
        ))}
    </>
  );
}

function NavLink({ ...appRoute }: AppRouteArgs) {
  const actualAppRoutePath = useAppSelector(
    (state) => state.appRoute.args?.path,
  );
  const label = appRoute.label ?? appRoute.path.split("/")[1];

  return (
    <Link
      href={appRoute.path}
      className={twMerge(
        "btn btn-ghost cursor-pointer font-normal capitalize",
        actualAppRoutePath === appRoute.path && "bg-base-300",
      )}
    >
      {label}
    </Link>
  );
}

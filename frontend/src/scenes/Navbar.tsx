import type { routerTypes } from "../types";

import { twMerge } from "tailwind-merge";
import { selectIsLoggedIn } from "../features/clientSlice";
import useAppSelector from "../hooks/useAppSelector";
import Logo from "../components/Logo";
import { Link } from "wouter";
import ProfilePicture from "../components/ProfilePicture";
import { GiHamburgerMenu } from "react-icons/gi";
import useAppDispatch from "../hooks/useAppDispatch";
import { toggleTheme } from "../features/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import pages from "../app/pages";

export default function Navbar() {
  const drawerMode = useAppSelector(
    (state) => state.route.attributes?.drawerMode,
  );
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

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
        {isLoggedIn ? (
          <ProfilePicture />
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
  const drawerMode = useAppSelector(
    (state) => state.route.attributes?.drawerMode,
  );

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
      className="btn btn-square btn-ghost hidden ~text-lg/xl lg:block"
      onClick={() => dispatch(toggleTheme())}
    >
      {themeMode === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}

function MobileDropdown() {
  const label = useAppSelector((state) => state.route.attributes?.label);

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
      {pages
        .filter((page) => page.navbar)
        .map((page) => (
          <li key={page.path}>
            <NavLink {...page} />
          </li>
        ))}
    </>
  );
}

function NavLink({ ...route }: routerTypes.Route) {
  const currentPath = useAppSelector((state) => state.route.attributes?.path);
  const label = route.label ?? route.path.split("/")[1];

  return (
    <Link
      href={route.path}
      className={twMerge(
        "btn btn-ghost cursor-pointer font-normal capitalize",
        currentPath === route.path && "bg-base-300",
      )}
    >
      {label}
    </Link>
  );
}

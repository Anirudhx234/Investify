import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../components/Logo";
import useDrawer from "../hooks/useDrawer";
import twMerge from "../utils/twMerge";
import { Link } from "wouter";

export default function Navbar() {
  const drawer = useDrawer();

  return (
    <nav className="navbar w-full">
      <div className="navbar-start gap-1">
        {drawer.mode !== "disabled" && (
          <label
            aria-label="Open Menu"
            htmlFor="drawer"
            className={twMerge(
              "btn btn-square btn-ghost drawer-button ~text-lg/xl",
              drawer.mode === "open-enabled" && "lg:hidden",
            )}
          >
            <GiHamburgerMenu />
          </label>
        )}
        <div className={twMerge(drawer.mode === "open-enabled" && "lg:hidden")}>
          <Logo />
        </div>
      </div>
      <div className="navbar-end">
        <ul className="flex">
          <li>
            <Link
              to="/browse-assets"
              className="btn btn-ghost cursor-pointer font-normal"
            >
              Browse Assets
            </Link>
          </li>
          <li>
            <Link
              to="/manage-portfolio"
              className="btn btn-ghost cursor-pointer font-normal"
            >
              Manage Portfolio
            </Link>
          </li>
          <li>
            <Link
              to="/create-projections"
              className="btn btn-ghost cursor-pointer font-normal"
            >
              Create Projections
            </Link>
          </li>
          <li>
            <Link
              to="/play-competitions"
              className="btn btn-ghost cursor-pointer font-normal"
            >
              Play Competitions
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

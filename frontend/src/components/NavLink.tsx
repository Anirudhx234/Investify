import { Link, useLocation } from "wouter";
import routeToText from "../utils/routeToText";
import twMerge from "../utils/twMerge";

export default function NavLink({ route }: { route: string }) {
  const [location] = useLocation();
  const isActive = location.includes(route);

  return (
    <Link
      to={route}
      className={twMerge(
        "btn btn-ghost cursor-pointer font-normal capitalize",
        isActive && "bg-base-300",
      )}
    >
      {routeToText(route)}
    </Link>
  );
}

import { GiHamburgerMenu } from "react-icons/gi";
import useDrawer from "../hooks/useDrawer";
import twMerge from "../utils/twMerge";

export default function DrawerBurger() {
  const drawer = useDrawer();
  if (drawer.mode === "disabled") return <></>;

  return (
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
  );
}

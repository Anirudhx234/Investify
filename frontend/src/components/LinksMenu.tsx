import { ReactNode } from "react";
import twMerge from "../util/twMerge";
import { Link } from "wouter";

export interface MenuItems {
  items: Record<string, MenuItems> | string[];
}

export interface LinksMenuProps {
  menuItems: MenuItems;
  icons?: Record<string, ReactNode> | undefined;
  className?: string | undefined;
}

export default function LinksMenu({
  menuItems,
  icons,
  className,
}: LinksMenuProps) {
  if (Array.isArray(menuItems.items)) {
    return (
      <ul className={className}>
        {menuItems.items.map((item) => (
          <li key={item}>
            <Link
              href={item}
              className={(active) => twMerge("capitalize", active && "active")}
            >
              <span>{icons?.[item]}</span>
              {item.split("/").slice(-1)[0]}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={className}>
      {Object.entries(menuItems.items).map(([key, item]) => (
        <li key={key}>
          <>
            <div className="menu-title capitalize">
              <span>{icons?.[key]}</span>
              {key}
            </div>
            <LinksMenu menuItems={item} icons={icons} />
          </>
        </li>
      ))}
    </ul>
  );
}

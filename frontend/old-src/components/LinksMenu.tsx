import { ReactNode } from "react";
import twMerge from "../util/twMerge";
import { Link } from "wouter";

export interface MenuItems {
  items:
    | Record<string, MenuItems>
    | (string | { link: string; label: string })[];
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
        {menuItems.items.map((item) => {
          let link: string, label: string;
          if (typeof item === "string") {
            link = item;
            label = item.split("/").slice(-1)[0];
          } else {
            link = item.link;
            label = item.label;
          }

          return (
            <li key={link}>
              <Link
                href={link}
                className={(active) =>
                  twMerge("capitalize", active && "active")
                }
              >
                <span>{icons?.[link]}</span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={className}>
      {Object.entries(menuItems.items).map(([key, item]) => (
        <li key={key}>
          <>
            <div className="menu-title flex items-center gap-2 capitalize">
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

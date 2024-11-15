import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface MenuItems<T extends { key: string }> {
  i: Record<string, MenuItems<T>> | T[];
}

export interface RecursiveMenuProps<T extends { key: string }> {
  menuItems: MenuItems<T>;
  renderItem: (arg0: T) => ReactNode;
  icons?: Record<string, ReactNode> | undefined;
  className?: string | undefined;
}

export function RecursiveMenu<T extends { key: string }>({
  className,
  ...props
}: RecursiveMenuProps<T>) {
  return (
    <RecursiveMenuCreator
      className={twMerge("menu w-full", className)}
      {...props}
    />
  );
}

export function RecursiveMenuCreator<T extends { key: string }>({
  menuItems,
  renderItem,
  icons,
  className,
}: RecursiveMenuProps<T>) {
  if (Array.isArray(menuItems.i)) {
    return (
      <ul className={className}>
        {menuItems.i.map((item) => (
          <li key={item.key}>{renderItem(item)}</li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={className}>
      {Object.entries(menuItems.i).map(([key, item]) => (
        <li key={key}>
          <>
            <div className="menu-title flex items-center gap-2 capitalize">
              <span>{icons?.[key]}</span>
              {key}
            </div>
            <RecursiveMenuCreator
              menuItems={item}
              renderItem={renderItem}
              icons={icons}
            />
          </>
        </li>
      ))}
    </ul>
  );
}

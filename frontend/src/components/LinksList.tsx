import { Link } from "wouter";
import { convertToTitleCase } from "../util/convertToTitleCase";
import { getLastPartOfUrl } from "../util/getLastPartOfUrl";
import { RecursiveMenu } from "./RecursiveMenu";
import { twMerge } from "../util/twMerge";

export interface MenuLink {
  key: string;
  link: string;
  label: string;
}

export interface LinksListProps {
  links: string[];
  className?: string | undefined;
}

export function LinksList({ links, className }: LinksListProps) {
  const menuLinks = links.map((link) => ({
    key: link,
    link,
    label: convertToTitleCase(getLastPartOfUrl(link)),
  }));

  return (
    <RecursiveMenu
      menuItems={{ i: menuLinks }}
      className={className}
      renderItem={(link) => (
        <Link
          href={link.link}
          className={(active) => twMerge(active && "active")}
        >
          {link.label}
        </Link>
      )}
    />
  );
}

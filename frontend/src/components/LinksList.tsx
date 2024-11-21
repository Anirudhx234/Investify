import { Link } from "wouter";
import { convertToTitleCase } from "../util/convertToTitleCase";
import { getLastPartOfUrl } from "../util/getLastPartOfUrl";
import { RecursiveMenu } from "./RecursiveMenu";
import { twMerge } from "../util/twMerge";

export interface MenuLink {
  key: string;
  url: string;
  label: string;
}

export interface LinksListProps {
  links: (string | { url: string; label: string })[];
  className?: string | undefined;
}

export function LinksList({ links, className }: LinksListProps) {
  const menuLinks = links.map((link) => {
    let url, label;

    if (typeof link === "string") {
      url = link;
      label = convertToTitleCase(getLastPartOfUrl(link));
    } else {
      url = link.url;
      label = link.label;
    }

    return { key: url, url, label };
  });

  return (
    <RecursiveMenu
      menuItems={{ i: menuLinks }}
      className={className}
      renderItem={(link) => (
        <Link
          href={link.url}
          className={(active) => twMerge(active && "active")}
        >
          {link.label}
        </Link>
      )}
    />
  );
}

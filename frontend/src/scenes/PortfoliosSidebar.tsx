import { RecursiveMenu } from "../components/RecursiveMenu";
import { useMemo } from "react";
import { useClientPortfoliosQuery } from "../api/portfolio";
import { useRequest } from "../hooks/useRequests";
import { Link } from "wouter";
import { CiSettings } from "react-icons/ci";
import { twMerge } from "../util/twMerge";
import { FaRegPaperPlane, FaWallet } from "react-icons/fa";

export type PortfolioMenuItem = { key: string; id: string; name: string };

export function PortfoliosSidebar() {
  const clientPortfoliosState = useClientPortfoliosQuery();

  useRequest({
    requestLabel: "Client Portfolios",
    requestState: clientPortfoliosState,
    successMessage: "Retrieved portfolios!",
  });

  const data = clientPortfoliosState.data;

  const menuItems = useMemo(() => {
    const real = data?.realPortfolios.map((e) => ({ key: e.id, ...e })) ?? [];
    const paper = data?.paperPortfolios.map((e) => ({ key: e.id, ...e })) ?? [];

    return {
      i: {
        "real portfolios": { i: real },
        "paper portfolios": { i: paper },
      },
    };
  }, [data]);

  return (
    <>
      <ul className="menu w-full">
        <li>
          <Link to="/" className={(active) => twMerge(active && "active")}>
            <CiSettings className="text-lg" />
            General
          </Link>
        </li>
      </ul>

      <RecursiveMenu
        menuItems={menuItems}
        renderItem={(item) => (
          <Link
            href={`/${item.id}`}
            className={(active) => twMerge(active && "active")}
          >
            {item.name}
          </Link>
        )}
        icons={{
          "real portfolios": <FaWallet className="text-info" />,
          "paper portfolios": <FaRegPaperPlane className="text-base-content" />,
        }}
      />
    </>
  );
}

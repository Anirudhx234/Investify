import { RecursiveMenu } from "../components/RecursiveMenu";
import { useMemo } from "react";
import { useClientPortfoliosQuery } from "../api/portfolio";
import { Link } from "wouter";
import { CiSettings } from "react-icons/ci";
import { twMerge } from "../util/twMerge";
import { FaRegPaperPlane, FaWallet } from "react-icons/fa";
import { useToastForRequest } from "../hooks/useToastForRequests";

export function PortfoliosSidebar() {
  const clientPortfoliosState = useClientPortfoliosQuery();
  const data = clientPortfoliosState.data;

  const menuItems = useMemo(() => {
    const real =
      data?.realPortfolios.map((e) => ({ key: e.id, type: "real", ...e })) ??
      [];
    const paper =
      data?.paperPortfolios.map((e) => ({ key: e.id, type: "paper", ...e })) ??
      [];

    return {
      i: {
        "real portfolios": { i: real },
        "paper portfolios": { i: paper },
      },
    };
  }, [data]);

  const { componentNoCaption, isSuccess } = useToastForRequest(
    "Your Portfolios",
    clientPortfoliosState,
    {
      backupSuccessMessage: "Retrieved portfolios!",
    },
  );

  if (!isSuccess)
    return (
      <div className="mt-20 flex w-full justify-center">
        {componentNoCaption}
      </div>
    );

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
            href={`/${item.type}/${item.id}`}
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

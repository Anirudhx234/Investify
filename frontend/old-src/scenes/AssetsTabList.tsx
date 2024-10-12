import { AiOutlineStock } from "react-icons/ai";
import { Link } from "wouter";
import twMerge from "../utils/twMerge";
import routeToText from "../utils/routeToText";
import { GrCertificate } from "react-icons/gr";
import { FaChartPie } from "react-icons/fa";
import { TbCoinFilled } from "react-icons/tb";
import { IoGridSharp } from "react-icons/io5";

export default function AssetsTabList() {
  const tabs = [
    {
      route: "/stocks",
      icon: <AiOutlineStock />,
    },
    {
      route: "/etfs",
      icon: <GrCertificate />,
    },
    {
      route: "/mutual-funds",
      icon: <FaChartPie />,
    },
    {
      route: "/crypto",
      icon: <TbCoinFilled />,
    },
  ];

  return (
    <div className="grid grid-cols-1">
      <div role="tablist" className="flex items-center ~gap-3/8">
        {tabs.map((tab) => (
          <Link
            key={tab.route}
            href={tab.route}
            role="tab"
            className={(active) =>
              twMerge(
                "btn flex items-center gap-1 border border-base-300",
                active && "btn-primary",
              )
            }
          >
            {tab.icon}
            <p className="hidden capitalize sm:block">
              {routeToText(tab.route) || "all"}
            </p>
          </Link>
        ))}
      </div>
      <div className="divider"></div>
    </div>
  );
}

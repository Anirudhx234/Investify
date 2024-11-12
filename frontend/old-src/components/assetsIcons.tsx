import type { ReactNode } from "react";
import type Assets from "../types/Assets";
import { AiOutlineStock } from "react-icons/ai";
import { FaChartPie } from "react-icons/fa";
import { RiExchange2Fill } from "react-icons/ri";
import { TbCoinFilled } from "react-icons/tb";

const assetsIcons: Record<Assets.Type, ReactNode> = {
  stocks: <AiOutlineStock className="text-lg text-success" />,
  "mutual-funds": <FaChartPie className="text-lg text-warning" />,
  etfs: <RiExchange2Fill className="text-lg text-info" />,
  crypto: <TbCoinFilled className="text-lg text-error" />,
};

export default assetsIcons;

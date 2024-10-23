import type { ReactNode } from "react";
import type Assets from "../types/Assets";
import { AiOutlineStock } from "react-icons/ai";
import { FaChartPie } from "react-icons/fa";
import { RiExchange2Fill } from "react-icons/ri";
import { TbCoinFilled } from "react-icons/tb";
import { IoGridSharp } from "react-icons/io5";

const assetsIcons: Record<Assets.Type | "", ReactNode> = {
  "": <IoGridSharp className="text-primary text-lg" />,
  stocks: <AiOutlineStock className="text-success text-lg" />,
  "mutual-funds": <FaChartPie className="text-warning text-lg" />,
  etfs: <RiExchange2Fill className="text-info text-lg" />,
  crypto: <TbCoinFilled className="text-error text-lg" />,
};

export default assetsIcons;

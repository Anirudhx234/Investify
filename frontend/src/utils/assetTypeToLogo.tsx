import { AiOutlineStock } from "react-icons/ai";
import Asset from "../types/Asset";
import { FaChartPie } from "react-icons/fa";
import { TbCoinFilled } from "react-icons/tb";
import { GrCertificate } from "react-icons/gr";
import { IoGridSharp } from "react-icons/io5";

export default function assetTypeToLogo(type: Asset.Type | "") {
  const tabs = {
    stocks: <AiOutlineStock />,
    "mutual-funds": <FaChartPie />,
    crypto: <TbCoinFilled />,
    etfs: <GrCertificate />,
    "": <IoGridSharp />,
  };

  return tabs[type];
}

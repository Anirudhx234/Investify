import { CiMoneyBill } from "react-icons/ci";
import {useGetPaperPortfolioQuery, useRiskScoreQuery} from "../api/portfolio";
import { formatNumber } from "../util/formatNumber";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { GiProfit } from "react-icons/gi";
import {FaWallet} from "react-icons/fa";

export function PaperPortfolioStats({ id }: { id: string }) {
  const { data: portfolioData } = useGetPaperPortfolioQuery({ id });
  const { data: riskAssessmentData } = useRiskScoreQuery({ portfolioId: id });

  return (
    <div className="stats stats-vertical md:stats-horizontal">
      {portfolioData && (
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaWallet className="inline-block h-8 w-8 stroke-current" />
            </div>
            <div className="stat-title">Portfolio Value</div>
            <div className="stat-value">
              {formatNumber(portfolioData.totalPortfolioValue)}
            </div>
          </div>
      )}
      {portfolioData && (
        <div className="stat">
          <div className="stat-figure text-secondary">
            <CiMoneyBill className="inline-block h-8 w-8 stroke-current" />
          </div>
          <div className="stat-title">Buying Power</div>
          <div className="stat-value">
            {formatNumber(portfolioData.buyingPower)}
          </div>
        </div>
      )}

      {riskAssessmentData && (
        <div className="stat">
          <div className="stat-figure text-secondary">
            <HiOutlineExclamationTriangle className="inline-block h-8 w-8 stroke-current" />
          </div>
          <div className="stat-title">Overall Risk</div>
          <div className="stat-value">
            {formatNumber(riskAssessmentData.overallRiskScore)}
          </div>
        </div>
      )}

      {portfolioData && (
        <div className="stat">
          <div className="stat-figure text-secondary">
            <GiProfit className="inline-block h-8 w-8 stroke-current" />
          </div>
          <div className="stat-title">ROI</div>
          <div className="stat-value">
            {formatNumber(portfolioData.roi * 100)}%
          </div>
        </div>
      )}
    </div>
  );
}

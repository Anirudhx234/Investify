import { CiMoneyBill } from "react-icons/ci";
import { useGetPortfolioQuery, useRiskScoreQuery } from "../api/portfolio";
import { formatNumber } from "../util/formatNumber";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { GiProfit } from "react-icons/gi";

export function PortfolioStats({ id }: { id: string }) {
  const { data: portfolioData } = useGetPortfolioQuery({ id });
  const { data: riskAssessmentData } = useRiskScoreQuery({ portfolioId: id });

  return (
    <div className="stats stats-vertical sm:stats-horizontal">
      {portfolioData && (
        <div className="stat">
          <div className="stat-figure text-secondary">
            <CiMoneyBill className="inline-block h-8 w-8 stroke-current" />
          </div>
          <div className="stat-title">Total Value</div>
          <div className="stat-value">
            {formatNumber(portfolioData.totalPortfolioValue)}
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

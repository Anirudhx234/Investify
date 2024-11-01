import { useParams } from "wouter";
import { useClientProfileQuery } from "../api/clients";
import {InvestmentRisk} from "../enums/InvestmentRisk";

const InvestmentAdvice: React.FC = () => {
    const params = useParams() as { id: string };
    const clientProfileState = useClientProfileQuery({ id: params.id });

    const generalAdvice = [
        "Diversify your portfolio to reduce risk.",
        "Invest in index funds for long-term growth.",
        "Keep an eye on fees and expenses.",
        "Stay informed about market trends and economic indicators.",
        "Have a clear investment strategy and stick to it."
    ];

    const ageAdvice = () => {
        const age = clientProfileState.data?.age;

        if (age < 30) {
            return [
                "Since you are under 30...",
                "Start investing early to take advantage of compound interest.",
                "Consider aggressive growth stocks and ETFs for higher returns.",
                "Build a budget and focus on saving a portion of your income."
            ];
        } else if (age >= 30 && age < 50) {
            return [
                "Since you are between 30 and 50...",
                "Diversify your portfolio to balance risk and returns.",
                "Focus on retirement accounts like 401(k)s or IRAs.",
                "Keep an eye on your financial goals and adjust your strategy accordingly."
            ];
        } else if (age >= 50) {
            return [
                "Since you are over 50...",
                "Shift to more conservative investments to preserve capital.",
                "Consider income-generating investments such as dividends and bonds.",
                "Plan for retirement and healthcare expenses."
            ];
        } else {
            return ["Please enter your age to receive tailored investment advice."];
        }
    };

    const incomeAdvice = () => {
        const income = clientProfileState.data?.income;

        if (income && income < 50000) {
            return [
                "Since your income is below 50000, you should...",
                "Focus on building an emergency fund.",
                "Consider low-cost index funds to start.",
                "Avoid high-fee investment products."
            ];
        } else if (income >= 50000 && income < 100000) {
            return [
                "Since your income is between 50000 and 100000, you should...",
                "Start investing in a mix of stocks and bonds.",
                "Explore employer-sponsored retirement plans.",
                "Consider automated investing platforms."
            ];
        } else if (income >= 100000) {
            return [
                "Since your income is above 100000, you should...",
                "Maximize contributions to retirement accounts.",
                "Consider tax-efficient investment strategies.",
                "Diversify into real estate or alternative investments."
            ];
        } else {
            return ["Please enter your income to receive tailored investment advice."];
        }
    };

    const riskToleranceAdvice = () => {
        const riskTolerance = clientProfileState.data?.investmentRisk;

        switch (riskTolerance) {
            case InvestmentRisk.LOW:
                return [
                    "Since your risk tolerance is low...",
                    "Consider conservative investments like bonds and stable dividend stocks.",
                    "Focus on capital preservation and income generation.",
                    "Avoid high-volatility assets."
                ];
            case InvestmentRisk.MEDIUM:
                return [
                    "Since your risk tolerance is medium...",
                    "Balance your portfolio with a mix of stocks and bonds.",
                    "Consider moderate growth funds and ETFs.",
                    "Stay informed about market conditions."
                ];
            case InvestmentRisk.HIGH:
                return [
                    "Since your risk tolerance is high...",
                    "Invest in high-growth stocks and emerging markets.",
                    "Be prepared for volatility and short-term losses.",
                    "Consider alternative investments for higher returns."
                ];
            default:
                return ["Please tell us your investment risk tolerance to receive tailored advice."];
        }
    };

    const tailoredAgeAdvice = clientProfileState.data?.age ? ageAdvice() : [];
    const tailoredIncomeAdvice = clientProfileState.data?.income ? incomeAdvice() : [];
    const tailoredRiskAdvice = clientProfileState.data?.investmentRisk ? riskToleranceAdvice() : [];

    return (
        <div>
            <h2><strong>Investment Advice</strong></h2>

            {!clientProfileState.data?.age &&
                <h1>Please enter your age under "Personal".</h1>}
            {!clientProfileState.data?.income &&
                <h1>Please enter your income under "Personal".</h1>}
            {!clientProfileState.data?.investmentRisk &&
                <h1>Please tell us your investment risk tolerance under "Financial Goals".</h1>}

            {(clientProfileState.data?.age && clientProfileState.data?.income
                    && clientProfileState.data?.investmentRisk) &&
                <div>
                    <br /><br />
                    <h4>Based on Age:</h4>
                    <ul>
                        {tailoredAgeAdvice.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <br /><br />

                    <h4>Based on Income:</h4>
                    <ul>
                        {tailoredIncomeAdvice.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <br /><br />

                    <h4>Based on Investment Risk Tolerance:</h4>
                    <ul>
                        {tailoredRiskAdvice.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>

                    {/*<h3>General Investment Advice:</h3>*/}
                    {/*<ul>*/}
                    {/*    {generalAdvice.map((item, index) => (*/}
                    {/*        <li key={index}>*/}
                    {/*            {item}*/}
                    {/*        </li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                </div>
            }
        </div>
    );
};

export default InvestmentAdvice;

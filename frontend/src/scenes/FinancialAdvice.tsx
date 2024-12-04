import { useLoggedInClientProfileQuery } from "../api/clients";

export function FinancialAdvice() {
  const clientProfileState = useLoggedInClientProfileQuery();

  return (
    <div className="flex w-full flex-col gap-4 ~text-sm/base">
      <h1 className="text-center font-bold ~text-2xl/3xl">Financial Advice</h1>
      <p className="text-center text-sm">Powered by ChatGPT</p>

      <div className="divider"></div>

      {clientProfileState.data?.financialAdvice ? (
        <p>{clientProfileState.data?.financialAdvice}</p>
      ) : (
        <p>Edit your profile to see advice!</p>
      )}
    </div>
  );
}

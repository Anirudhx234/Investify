import { Redirect, Route, Switch, useParams } from "wouter";
import { useClientProfileQuery } from "../api/clients";
import { MdErrorOutline } from "react-icons/md";
import ProfileAccountForm from "../forms/ProfileAccountForm";
import ProfileGeneralForm from "../forms/ProfileGeneralForm";
import ProfilePersonalForm from "../forms/ProfilePersonalForm";
import ProfileFinancialForm from "../forms/ProfileFinancialForm";
import InvestmentAdvice from "../scenes/InvestmentAdvice";

export default function ClientsPage() {
  const params = useParams() as { id: string };
  const { data, isError, error } = useClientProfileQuery({
    id: params.id,
  });

  const isLoggedInUser = params.id === "me";
  const errorMssg = error?.message ?? "An error occurred";

  if (isError) {
    return (
      <div className="flex h-20 items-center justify-center gap-1 text-error">
        <MdErrorOutline />
        <p>{errorMssg}</p>
      </div>
    );
  }

  if (data) {
    return (
      <Switch>
        <Route path="/account" component={ProfileAccountForm} />
        <Route path="/general" component={ProfileGeneralForm} />
        {isLoggedInUser && (
          <>
          <Route path="/personal" component={ProfilePersonalForm} />
          <Route path="/financial goals" component={ProfileFinancialForm} />
          <Route path="/investment advice" component={InvestmentAdvice} />
          </>
        )}
        <Route path="*" component={() => <Redirect to="/account" replace />} />
      </Switch>
    );
  }

  return (
    <div className="flex h-20 items-center justify-center gap-2">
      <span className="loading loading-spinner"></span>
      <p>Loading...</p>
    </div>
  );
}

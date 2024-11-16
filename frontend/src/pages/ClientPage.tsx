import { Redirect, Route, Switch, useParams } from "wouter";
import { useClientProfileQuery } from "../api/clients";
import { ProfileAccountForm } from "../forms/ProfileAccountForm";
import { useAppSelector } from "../hooks/useAppSelector";
import { ProfileGeneralForm } from "../forms/ProfileGeneralForm";
import { ProfilePersonalForm } from "../forms/ProfilePersonalForm";
import { ProfileFinancialForm } from "../forms/ProfileFinancialForm";
import { InvestmentAdvice } from "../scenes/InvestmentAdvice";
import { useToastForRequest } from "../hooks/useToastForRequests";

export function ClientPage() {
  const params = useParams() as { id?: string | undefined };
  const loggedInClientId = useAppSelector((state) => state.client.id);

  if (params.id === loggedInClientId)
    return <Redirect to="~/clients/me" replace />;

  return <ClientProfilePage />;
}

export function ClientProfilePage() {
  const params = useParams() as { id?: string | undefined };
  const clientId = params.id ?? "me";
  const clientState = useClientProfileQuery({ id: clientId });

  const { component, isSuccess } = useToastForRequest(
    "Client Profile",
    clientState,
    {
      backupSuccessMessage: "Profile Retrieved!",
    },
  );

  if (!isSuccess) return component;

  const isLoggedInClient = clientId === "me";
  return (
    <Switch>
      <Route path="/general" component={ProfileGeneralForm} />
      {isLoggedInClient && (
        <>
          <Route path="/account" component={ProfileAccountForm} />
          <Route path="/personal" component={ProfilePersonalForm} />
          <Route path="/financial-goals" component={ProfileFinancialForm} />
          <Route path="/investment-advice" component={InvestmentAdvice} />
        </>
      )}
      <Route path="*" component={() => <Redirect to="/general" replace />} />
    </Switch>
  );
}

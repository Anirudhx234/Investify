import { Redirect, Route, Switch, useParams } from "wouter";
import { useClientProfileQuery } from "../api/clients";
import useRequests from "../hooks/useRequests";
import ProfileAccountForm from "../forms/ProfileAccountForm";
import useAppSelector from "../hooks/useAppSelector";
import { useMemo } from "react";
import ProfileGeneralForm from "../forms/ProfileGeneralForm";

export default function ClientPage() {
  const params = useParams() as { id?: string | undefined };
  const loggedInClientId = useAppSelector((state) => state.client.id);

  if (params.id === loggedInClientId)
    return <Redirect to="~/clients/me" replace />;

  return <ClientProfilePage />;
}

function ClientProfilePage() {
  const params = useParams() as { id?: string | undefined };
  const clientId = params.id ?? "me";
  const clientState = useClientProfileQuery({ id: clientId });

  const requestStates = useMemo(
    () => ({ "Client Profile": clientState }),
    [clientState],
  );

  const { message } = useRequests({
    requestStates,
    successMessage: "Profile Retrieved!",
  });

  if (clientState.data) {
    const isLoggedInClient = clientId === "me";
    return (
      <Switch>
        <Route path="/general" component={ProfileGeneralForm} />
        {isLoggedInClient && (
          <>
            <Route path="/account" component={ProfileAccountForm} />
            {/* <Route path="/personal" component={ProfilePersonalForm} />
            <Route path="/financial-goals" component={ProfileFinancialForm} />
            <Route path="/investment-advice" component={InvestmentAdvice} /> */}
          </>
        )}
        <Route path="*" component={() => <Redirect to="/general" replace />} />
      </Switch>
    );
  } else {
    return <p className="text-lg font-bold">{message}</p>;
  }
}

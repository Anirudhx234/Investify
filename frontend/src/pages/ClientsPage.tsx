import { Redirect, Route, Switch, useParams } from "wouter";
import { useClientProfileQuery } from "../api/clients";
import { MdErrorOutline } from "react-icons/md";
import ProfileEmailForm from "../forms/ProfileEmailForm";
import ProfileGeneralForm from "../forms/ProfileGeneralForm";
import ProfilePersonalForm from "../forms/ProfilePersonalForm";

export default function ClientsPage() {
  const params = useParams() as { id: string };
  const { data, isError, error } = useClientProfileQuery({
    id: params.id,
  });

  const errorMssg = error?.message ?? "An error occurred";

  if (isError) {
    return (
      <div className="flex h-20 items-center justify-center gap-2 text-error">
        <MdErrorOutline />
        <p>{errorMssg}</p>
      </div>
    );
  }

  if (data) {
    return (
      <Switch>
        <Route path="/client" component={() => <ProfileEmailForm />} />
        <Route path="/general" component={() => <ProfileGeneralForm />} />
        <Route path="/personal" component={() => <ProfilePersonalForm />} />
        <Route component={() => <Redirect to="/client" replace />} />
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

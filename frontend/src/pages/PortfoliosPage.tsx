import { Redirect, Route, Switch } from "wouter";
import { AddPortfolioForm } from "../forms/AddPortfolioForm";
import { PortfolioEditorPage } from "./PortfolioEditorPage";

export function PortfoliosPage() {
  return (
    <Switch>
      <Route path="/" component={AddPortfolioForm} />
      <Route path="/:id" component={PortfolioEditorPage} />
      <Route path="*" component={() => <Redirect to="/" replace />} />
    </Switch>
  );
}

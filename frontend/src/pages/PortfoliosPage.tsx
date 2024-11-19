import { Redirect, Route, Switch } from "wouter";
import { AddPortfolioForm } from "../forms/AddPortfolioForm";
import { RealPortfolioEditorPage } from "./RealPortfolioEditorPage";
import { PaperPortfolioEditorPage } from "./PaperPortfolioEditorPage";

export function PortfoliosPage() {
  return (
    <Switch>
      <Route path="/" component={AddPortfolioForm} />
      <Route path="/real/:id" component={RealPortfolioEditorPage} />
      <Route path="/paper/:id" component={PaperPortfolioEditorPage} />
      <Route path="*" component={() => <Redirect to="/" replace />} />
    </Switch>
  );
}

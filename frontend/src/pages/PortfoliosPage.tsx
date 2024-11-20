import { Redirect, Route, Switch, useParams } from "wouter";
import { AddPortfolioForm } from "../forms/AddPortfolioForm";
import { RealPortfolioEditorPage } from "./RealPortfolioEditorPage";
import { PaperPortfolioEditorPage } from "./PaperPortfolioEditorPage";

export function PortfoliosPage() {
  return (
    <Switch>
      <Route path="/" component={AddPortfolioForm} />
      <Route path="/real/:id" component={RealPortfolio} />
      <Route path="/paper/:id" component={PaperPortfolio} />
      <Route path="*" component={() => <Redirect to="/" replace />} />
    </Switch>
  );
}

export function RealPortfolio() {
  const params = useParams() as { id: string };
  const { id } = params;
  return <RealPortfolioEditorPage id={id} />;
}

export function PaperPortfolio() {
  const params = useParams() as { id: string };
  const { id } = params;
  return <PaperPortfolioEditorPage id={id} />;
}

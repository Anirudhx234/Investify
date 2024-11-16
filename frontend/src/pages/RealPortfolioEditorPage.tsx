import { useParams } from "wouter";
import { useGetPortfolioQuery } from "../api/portfolio";

export function RealPortfolioEditorPage() {
  const params = useParams() as { id: string };
  const { id } = params;


  return <>Helo</>;
}

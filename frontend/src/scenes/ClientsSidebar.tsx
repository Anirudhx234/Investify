import { useParams } from "wouter";
import LinksMenu from "../components/LinksMenu";
import useAppSelector from "../hooks/useAppSelector";

export default function ClientsSidebar() {
  const loggedInClientId = useAppSelector((state) => state.client.id);
  const params = useParams() as { id: string };

  const items = ["/client", "/general"];
  if (params.id === loggedInClientId) {
    items.push("/personal");
  }

  return <LinksMenu className="menu w-full" menuItems={{ items }} />;
}

import { useLocation, useParams } from "wouter";
import { LinksList } from "../components/LinksList";
import { useLogoutMutation } from "../api/auth";
import { useDeleteClientMutation } from "../api/clients";
import { useRequests } from "../hooks/useRequests";
import { useDispatch } from "react-redux";
import { setClientId } from "../features/clientSlice";

export function ClientSidebar() {
  const params = useParams() as { id?: string | undefined };
  const clientId = params.id ?? "me";

  if (clientId === "me") return <ClientSidebarEdit />;
  else return <ClientSidebarView />;
}

const editItems = [
  "/account",
  "/general",
  "/personal",
  "/financial-goals",
  "/investment-advice",
];
export function ClientSidebarEdit() {
  const dispatch = useDispatch();
  const [, navigate] = useLocation();
  const [logout, logoutState] = useLogoutMutation();
  const [deleteAccount, deleteAccountState] = useDeleteClientMutation();

  useRequests({
    requestStates: {
      Logout: logoutState,
      "Delete Account": deleteAccountState,
    },
  });

  const onLogoutClick = async () => {
    try {
      await logout().unwrap();
    } catch {
      /* empty */
    }

    dispatch(setClientId(null));
    navigate("/");
  };

  const onDeleteClientClick = async () => {
    try {
      await deleteAccount().unwrap();
    } catch {
      /* empty */
    }

    dispatch(setClientId(null));
    navigate("/");
  };

  return (
    <>
      <LinksList links={editItems} />
      <div className="divider"></div>
      <ul className="menu w-full">
        <li>
          <button className="text-error" onClick={onLogoutClick}>
            Log out
          </button>
        </li>
        <li>
          <button className="text-error" onClick={onDeleteClientClick}>
            Delete account
          </button>
        </li>
      </ul>
    </>
  );
}

const viewItems = ["/account", "/general"];
export function ClientSidebarView() {
  return <LinksList links={viewItems} />;
}

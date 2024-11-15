import { useLocation, useParams } from "wouter";
import { LinksList } from "../components/LinksList";
import { useLogoutMutation } from "../api/auth";
import { useDeleteClientMutation } from "../api/clients";
import { useRequests } from "../hooks/useRequests";
import { useDispatch } from "react-redux";
import { setClientId } from "../features/clientSlice";
import { useCallback } from "react";

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

  const onSuccess = useCallback(() => {
    navigate("~/");
    dispatch(setClientId(null));
  }, [navigate, dispatch]);

  useRequests({
    requestStates: {
      Logout: logoutState,
      "Delete Account": deleteAccountState,
    },
    onSuccess,
  });

  const onLogoutClick = () => {
    logout().unwrap();
  };

  const onDeleteClientClick = () => {
    deleteAccount().unwrap();
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

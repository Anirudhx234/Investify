import { useLocation, useParams } from "wouter";
import { LinksList } from "../components/LinksList";
import { useLogoutMutation } from "../api/auth";
import { useDeleteClientMutation } from "../api/clients";
import { useDispatch } from "react-redux";
import { setClientId } from "../features/clientSlice";
import { useToastForRequests } from "../hooks/useToastForRequests";

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

  const { isSuccess, componentNoCaption } = useToastForRequests([
    { label: "Logout", state: logoutState },
    { label: "Delete Account", state: deleteAccountState },
  ]);

  const onLogoutClick = () => {
    navigate("~/");
    dispatch(setClientId(null));
    logout()
      .unwrap()
      .catch(() => {});
  };

  const onDeleteClientClick = () => {
    navigate("~/");
    dispatch(setClientId(null));
    deleteAccount()
      .unwrap()
      .catch(() => {});
  };

  if (!isSuccess)
    return (
      <div className="mt-20 flex w-full justify-center">
        {componentNoCaption}
      </div>
    );

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

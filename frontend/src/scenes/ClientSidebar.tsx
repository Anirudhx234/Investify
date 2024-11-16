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

  const { isSuccess, component } = useToastForRequests(
    [
      { label: "Logout", state: logoutState },
      { label: "Delete Account", state: deleteAccountState },
    ],
    {
      onSuccess: () => {
        navigate("~/");
        dispatch(setClientId(null));
      },
    },
  );

  const onLogoutClick = () => {
    logout().unwrap();
  };

  const onDeleteClientClick = () => {
    deleteAccount().unwrap();
  };

  if (!isSuccess) return component;

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

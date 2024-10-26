import { useParams } from "wouter";
import LinksMenu from "../components/LinksMenu";
import useAppSelector from "../hooks/useAppSelector";
import { useLogoutMutation } from "../api/auth";
import { useDeleteClientMutation } from "../api/clients";
import Modal from "../components/Modal";
import { useRef } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { setClientId } from "../features/clientSlice";

export default function ClientsSidebar() {
  const params = useParams() as { id: string };
  const [logout, logoutState] = useLogoutMutation();
  const [deleteAccount, deleteAccountState] = useDeleteClientMutation();
  const modalRef = useRef<HTMLDialogElement>(null);

  const dispatch = useAppDispatch();
  const loggedInClientId = useAppSelector((state) => state.client.id);
  const isLoggedInUser = params.id === loggedInClientId;

  const isError = logoutState.isError || deleteAccountState.isError;
  const errorMssg =
    logoutState.error?.message ||
    deleteAccountState.error?.message ||
    "An error occurred";

  const items = ["/account", "/general"];
  if (isLoggedInUser) items.push("/personal");

  const onLogoutClick = async () => {
    try {
      await logout().unwrap();
    } catch {
      /* empty */
    }

    modalRef.current?.showModal();
  };

  const onDeleteClientClick = async () => {
    try {
      await deleteAccount({ id: params.id }).unwrap();
    } catch {
      /* empty */
    }

    modalRef.current?.showModal();
  };

  const onModalExit = () => {
    modalRef.current?.close();
    if (!isError) dispatch(setClientId(null));
  };

  return (
    <>
      <LinksMenu className="menu w-full" menuItems={{ items }} />
      {isLoggedInUser && (
        <ul className="menu w-full">
          <div className="divider"></div>
          <li>
            <button className="text-error" onClick={() => onLogoutClick()}>
              Log out
            </button>
          </li>
          <li>
            <button
              className="text-error"
              onClick={() => onDeleteClientClick()}
            >
              Delete account
            </button>
          </li>
        </ul>
      )}
      <Modal
        ref={modalRef}
        onExit={onModalExit}
        title={!isError ? "Success!" : "Unsuccessful"}
      >
        {isError && <p className="py-4">{errorMssg}</p>}
      </Modal>
    </>
  );
}

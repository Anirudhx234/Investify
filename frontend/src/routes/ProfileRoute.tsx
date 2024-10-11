import { MdErrorOutline } from "react-icons/md";
import ProfileForm from "../scenes/ProfileForm";
import { useProfileDataQuery } from "../api/profile";
import { Redirect } from "wouter";
import useAppSelector from "../hooks/useAppSelector";

export default function ProfileRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { isLoading, isError, error, data } = useProfileDataQuery();
  const errorMssg = error?.message;

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-lg">
        {isLoading && (
          <div className="flex w-full items-center justify-center gap-2">
            <span className="loading loading-spinner loading-lg"></span>
            <p>Loading assets...</p>
          </div>
        )}
        {isError && (
          <div className="flex w-full items-center justify-center gap-1 text-base text-error">
            <MdErrorOutline />
            <p>{errorMssg}</p>
          </div>
        )}
        {data && <ProfileForm />}
      </div>
    </div>
  );
}

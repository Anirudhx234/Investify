import {Redirect, Route, Switch, useParams} from "wouter";
import { useUserProfileQuery } from "../api/clients";
import { MdErrorOutline } from "react-icons/md";
import UserProfileInfo from "../components/UserProfileInfo.tsx";

export default function UserPage() {
  const params = useParams() as { id: string };
  const { data, isError, error } = useUserProfileQuery({
    id: params.id,
  });

  const isLoggedInUser = params.id === "me";
  const errorMssg = error?.message ?? "An error occurred";

  if (isError) {
    return (
      <div className="flex h-20 items-center justify-center gap-1 text-error">
        <MdErrorOutline />
        <p>{errorMssg}</p>
      </div>
    );
  }

  if (data) {
    return (
      <Switch>
          {isLoggedInUser &&
              <Route path="/account" component={UserProfileInfo} />
          }
          <Route path="*" component={() => <Redirect to="/home" replace />} />
      </Switch>
    );
  }

  return (
    <div className="flex h-20 items-center justify-center gap-2">
      <span className="loading loading-spinner"></span>
      <p>Loading...</p>
    </div>
  );
}

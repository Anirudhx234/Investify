import { Link } from "wouter";
import useAppSelector from "../hooks/useAppSelector";
import { useProfileDataQuery } from "../api/profile";
import ProfilePicture from "./ProfilePicture";

function NavProfilePictureLink() {
  const { isSuccess, data } = useProfileDataQuery();

  return (
    <div className="mx-1 flex items-center">
      <Link href="/profile">
        <ProfilePicture src={isSuccess ? data.profilePicture : undefined} />
      </Link>
    </div>
  );
}

export default function NavProfileLink() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="mx-1 flex items-center">
        <Link href="/login" className="btn btn-secondary btn-sm">
          Login
        </Link>
      </div>
    );
  }

  return <NavProfilePictureLink />;
}

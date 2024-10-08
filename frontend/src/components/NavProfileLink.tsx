import { Link } from "wouter";
import { selectProfileData } from "../features/profileSlice";
import useAppSelector from "../hooks/useAppSelector";

export default function NavProfileLink() {
  const profileData = useAppSelector(selectProfileData);

  if (!profileData) {
    return (
      <div className="flex items-center mx-1">
        <Link href="/login" className="btn btn-secondary btn-sm">
          Login
        </Link>
      </div>
    );
  }

  return <>Profile Picture</>;
}

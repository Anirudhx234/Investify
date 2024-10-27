import { Link } from "wouter";
import { useClientProfileQuery } from "../api/clients";
import twMerge from "../util/twMerge";

export default function ProfilePicture({
  src,
  className,
  alt,
}: {
  src?: string | { id?: string | undefined } | undefined;
  className?: string | undefined;
  alt?: string | undefined;
}) {
  if (typeof src === "string") {
    return <ProfilePictureStringSrc src={src} alt={alt} className={className} />;
  }

  return <ProfilePictureUserSrc src={src} alt={alt} className={className} />;
}

function ProfilePictureStringSrc({
  src,
  className,
  alt,
}: {
  src?: string | undefined;
  className?: string | undefined;
  alt?: string | undefined;
}) {
  return (
    <div className={twMerge("h-8 w-8", className)}>
      <img
        src={src ?? "/default-profile-pic.svg"}
        alt={alt ?? "Profile Picture"}
        className="h-full w-full rounded-full border border-base-300"
      />
    </div>
  );
}

function ProfilePictureUserSrc({
  src,
  className,
  alt,
}: {
  src?: { id?: string | undefined } | undefined;
  className?: string | undefined;
  alt?: string | undefined;
}) {
  const { data } = useClientProfileQuery({ id: src?.id });

  return (
    <Link
      href={`/clients/${src?.id ?? "me"}`}
      className={twMerge("h-8 w-8", className)}
    >
      <img
        src={data?.profilePicture ?? "/default-profile-pic.svg"}
        alt={alt ?? `Profile Picture of Client ${data?.username ?? "Unknown"}`}
        className="h-full w-full rounded-full border border-base-300"
      />
    </Link>
  );
}

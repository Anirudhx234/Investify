import { Link } from "wouter";
import { twMerge } from "../util/twMerge";
import {
  useClientProfileQuery,
  useLoggedInClientProfileQuery,
} from "../api/clients";

export function ProfilePicture({
  src,
  className,
  alt,
}: {
  src?: string | { id: string } | undefined;
  className?: string | undefined;
  alt?: string | undefined;
}) {
  if (typeof src === "string") {
    return (
      <ProfilePictureStringSrc src={src} alt={alt} className={className} />
    );
  } else if (src && src.id) {
    return (
      <ProfilePictureClientSrc src={src} alt={alt} className={className} />
    );
  } else {
    return <ProfilePictureLoggedInClient alt={alt} className={className} />;
  }
}

export function ProfilePictureStringSrc({
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
        src={src ?? "/default-profile.svg"}
        alt={alt ?? "Profile Picture"}
        className="h-full w-full rounded-full border border-base-300"
      />
    </div>
  );
}

export function ProfilePictureClientSrc({
  src,
  className,
  alt,
}: {
  src: { id: string };
  className?: string | undefined;
  alt?: string | undefined;
}) {
  const { data } = useClientProfileQuery({ id: src.id });

  return (
    <Link href={`/clients/${src.id}`} className={twMerge("h-8 w-8", className)}>
      <img
        src={data?.profilePicture ?? "/default-profile.svg"}
        alt={alt ?? `Profile Picture of Client ${data?.username ?? "Unknown"}`}
        className="h-full w-full rounded-full border border-base-300"
      />
    </Link>
  );
}

export function ProfilePictureLoggedInClient({
  className,
  alt,
}: {
  className?: string | undefined;
  alt?: string | undefined;
}) {
  const { data } = useLoggedInClientProfileQuery();

  return (
    <Link href="/clients/me" className={twMerge("h-8 w-8", className)}>
      <img
        src={data?.profilePicture ?? "/default-profile.svg"}
        alt={alt ?? `Profile Picture of Client ${data?.username ?? "Unknown"}`}
        className="h-full w-full rounded-full border border-base-300"
      />
    </Link>
  );
}

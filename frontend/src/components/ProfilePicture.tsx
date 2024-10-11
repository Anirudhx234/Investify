import twMerge from "../utils/twMerge";

export interface ProfilePictureProps {
  src?: string | null | undefined;
  className?: string | undefined;
}

export default function ProfilePicture({
  src,
  className,
}: ProfilePictureProps) {
  return (
    <div className={twMerge("h-8 w-8", className)}>
      <img
        src={src ?? "/profile.svg"}
        alt="Profile Picture"
        className="h-full w-full rounded-full border border-base-300"
      />
    </div>
  );
}

import { Link } from "wouter";
import { useLoggedInClientProfileQuery } from "../api/clients";
import { ProfilePicture } from "../components/ProfilePicture";
import { ClientSearchBar } from "../scenes/ClientSearchBar";
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useRemoveFriendRequestMutation,
} from "../api/social";
import { useToastForRequests } from "../hooks/useToastForRequests";

export function SocialPage() {
  return (
    <div className="mt-6 flex w-full flex-col items-center gap-12">
      <ClientSearchBar />
      <div className="flex flex-wrap items-center justify-center gap-8">
        <FriendRequests />
        <Friends />
      </div>
    </div>
  );
}

export function FriendRequests() {
  const { data } = useLoggedInClientProfileQuery();

  const [acceptRequest, acceptRequestState] = useAcceptFriendRequestMutation();
  const [declineRequest, declineRequestState] =
    useDeclineFriendRequestMutation();

  useToastForRequests(
    [
      { label: "Accept Request", state: acceptRequestState },
      { label: "Decline Request", state: declineRequestState },
    ],
    { backupSuccessMessage: "Done!" },
  );

  return (
    <div className="flex aspect-[4/5] flex-col gap-4 rounded-md bg-base-200 p-2 py-4 shadow-sm ~w-80/96">
      <h2 className="flex justify-center text-lg font-bold">Friend Requests</h2>
      {data && (
        <ul className="h-hull w-full overflow-auto p-4">
          {data.friendRequests.map((e) => (
            <li key={e.id} className="flex items-center gap-4">
              <ProfilePicture src={e.profilePicture ?? "default-profile.svg"} />
              <Link className="link  max-w-40 whitespace-nowrap text-ellipsis overflow-hidden" href={`~/clients/${e.id}`}>
                {e.username}
              </Link>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  acceptRequest({ friendId: e.id })
                    .unwrap()
                    .catch(() => {});
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  declineRequest({ friendId: e.id })
                    .unwrap()
                    .catch(() => {});
                }}
              >
                Decline
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Friends() {
  const { data } = useLoggedInClientProfileQuery();

  const [remove, removeState] = useRemoveFriendRequestMutation();

  useToastForRequests([{ label: "Remove Request", state: removeState }], {
    backupSuccessMessage: "Done!",
  });

  return (
    <div className="flex aspect-[4/5] flex-col gap-4 rounded-md bg-base-200 p-2 py-4 shadow-sm ~w-80/96">
      <h2 className="flex justify-center text-lg font-bold">Friends</h2>
      {data && (
        <ul className="h-hull w-full overflow-auto p-4">
          {data.friends.map((e) => (
            <li key={e.id} className="flex items-center gap-4">
              <ProfilePicture src={e.profilePicture ?? "default-profile.svg"} />
              <Link className="link max-w-40 whitespace-nowrap text-ellipsis overflow-hidden" href={`~/clients/${e.id}`}>
                {e.username}
              </Link>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  remove({ friendId: e.id })
                    .unwrap()
                    .catch(() => {});
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

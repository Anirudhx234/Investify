import {
    useFetchClientsQuery,
    useLoggedInClientProfileQuery, 
    useAddFriendMutation,
    useRemoveFriendMutation,
    useAddFriendRequestMutation,
    useRemoveFriendRequestMutation,
} from "../api/clients";
import { FriendSearchBar } from "../components/FriendSearchBar";
import { useToastForRequest } from "../hooks/useToastForRequests";
import {FiX} from "react-icons/fi";

export interface RemoveFriendFormShape {
    clientId: string,
    friendId:string
}

export function FriendPage() {
  // Ask swastik
    const { data } = useLoggedInClientProfileQuery();
  // const currentUser = data!.username;

  // Fetch all users details
  const fetchUsernamesState = useFetchClientsQuery();
  useToastForRequest("Users", fetchUsernamesState, {
    backupSuccessMessage: "Retrieved users!",
  });

  const [removeFriend, removeFriendState] = useRemoveFriendMutation();
  const { isLoading: isLoadingRemove } = useToastForRequest("Remove Friend", removeFriendState, {
      backupSuccessMessage: "Friend removed!",
  });

  const { data: clients = [], isLoading, error } = useFetchClientsQuery();
  console.log(clients);

  const handleRemoveFriend = async (clientId: string, friendId: string) => {
      await removeFriend({clientId, friendId }).unwrap()
          .catch(() => {});
  };

  return (
    <div className="mt-6 flex w-full flex-col items-center gap-12">
      <h1 className="text-3xl font-bold text-primary">Connections!</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching clients</p>
      ) : (
        // Pass only the data to FriendSearchBar
        <FriendSearchBar values={clients} />
      )}
      <div>
  {data && data.friends && data.friends.length > 0 ? (
    <div>
      <p>Friends!!!</p>
      <ul>
        {data.friends.map((friend, index) => (
            <li key={index}>
                <span className="text-lg font-medium">{friend.username}</span>

                <button
                    className="btn btn-sm btn-ghost text-red-500 flex items-center gap-2 hover:text-red-700"
                    onClick={() => handleRemoveFriend(data.id, friend.id)}
                    disabled={isLoadingRemove}
                >
                    <FiX className="text-xl"/>
                    <span className="font-bold">Remove</span>
                </button>
            </li>
        ))}
      </ul>
    </div>
  ) : (
      <p>No friends found.</p>
  )}
      </div>
      <div>
  {data && data.friendreq && data.friendreq.length > 0 ? (
    <div>
      <p>Friend Requests!!!</p>
      <ul>
        {data.friendreq.map((friendreq, index) => (
            <li key={index}>
                <span className="text-lg font-medium">{friendreq.username}</span>

                <button
                    className="btn btn-sm btn-ghost text-red-500 flex items-center gap-2 hover:text-red-700"
                    disabled={isLoadingRemove}
                >
                    <FiX className="text-xl"/>
                    <span className="font-bold">Ok</span>
                </button>
                <button
                    className="btn btn-sm btn-ghost text-red-500 flex items-center gap-2 hover:text-red-700"
                    disabled={isLoadingRemove}
                >
                    <FiX className="text-xl"/>
                    <span className="font-bold">No</span>
                </button>
            </li>
        ))}
      </ul>
    </div>
  ) : (
      <p>No friend requests found.</p>
  )}
      </div>

    </div>
  );
}

import {
  useFetchClientsQuery,
  useLoggedInClientProfileQuery
} from "../api/clients";
import { FriendSearchBar } from "../components/FriendSearchBar";
import { useToastForRequest } from "../hooks/useToastForRequests";

export function FriendPage() {
  // Ask swastik
    const { data } = useLoggedInClientProfileQuery();
//   const currentUser = data!.username;

  // Fetch all users details
  const fetchUsernamesState = useFetchClientsQuery();
  useToastForRequest("Users", fetchUsernamesState, {
    backupSuccessMessage: "Retrieved users!",
  });


  const { data: clients = [], isLoading, error } = useFetchClientsQuery();
  console.log(clients);

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
  {data?.friends.length > 0 ? (
    <div>
      <p>Friends!!!</p>
      <ul>
        {data.friends.map((friend, index) => (
          <li key={index}>
            {/* Assuming 'friend' is an object with a 'username' property */}
            {friend.username}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>No friends found.</p>
  )}
</div>

    </div>
  );
}

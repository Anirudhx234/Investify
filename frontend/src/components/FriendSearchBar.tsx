import { useState, useEffect } from "react";
import { clientTypes } from "../types";
import {
    useAddFriendMutation,
    useRemoveFriendMutation,
    useAddFriendRequestMutation,
    useRemoveFriendRequestMutation,
    useLoggedInClientProfileQuery,
  } from "../api/clients";

interface SearchBarProps {
  values: clientTypes.Client[];
}

export function FriendSearchBar({ values }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [filteredValues, setFilteredValues] = useState<clientTypes.Client[]>([]);
  const { data: loggedInClient } = useLoggedInClientProfileQuery(); // Fetch logged-in client's profile data
  const clientId = loggedInClient?.id;

  // Handle query changes with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        const filtered = values.filter((value) =>
          value.username.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredValues(filtered);
      } else {
        setFilteredValues([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query, values]);

//   const handleAddFriend = async (friendId: string) => {
//     if (!clientId) {
//       alert("You must be logged in to add friends.");
//       return;
//     }

//     try {
//       // Trigger the add friend mutation (replace useAddFriendQuery with your mutation hook)
//       await useAddFriendQuery({ clientId, friendId }).unwrap();
//       alert("Friend added successfully!");
//     } catch (err) {
//       console.error("Failed to add friend", err);
//       alert("Failed to add friend.");
//     }
//   };

  return (
    <div className="flex flex-col items-center w-3/4">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search users..."
        className="input input-bordered mb-2 w-64"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search for a user"
      />

      {/* Dropdown Results */}
      {query && (
        <ul className="w-full max-w-xs rounded-lg shadow-lg bg-white">
          {filteredValues.length > 0 ? (
            filteredValues.map((value) => (
              <li
                key={value.id}
                className="flex items-center justify-between p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                role="button"
              >
                {/* Profile Picture */}
                <div className="flex items-center">
                  <img
                    src={value.profilePicture || "default-profile.png"}
                    alt={value.username}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span>{value.username}</span>
                </div>
                {/* Add Friend Button */}
                <button
                  className="btn btn-primary btn-sm"
                >
                  Add
                </button>
              </li>
            ))
          ) : (
            <li className="p-2 text-center text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

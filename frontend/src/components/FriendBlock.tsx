// import { UserDetail } from "./UserDetail";

// interface FriendBlockProps {
//   selectedUsers: string[];
//   onRemoveUser: (username: string) => void;
// }

// export function FriendBlock({ selectedUsers, onRemoveUser }: FriendBlockProps) {
//   return (
//     <div className="mt-4 w-full max-w-xs">
//       {selectedUsers.length > 0 && (
//         <div className="items-center">
//           <h4 className="text-3xl font-bold text-secondary">Friends!</h4>
//           {selectedUsers.map((username) => (
//             <div
//               key={username}
//               className="flex flex-col p-4 mb-4 bg-gray-100 rounded-lg shadow-md"
//             >
//               {/* Display user details */}
//               <UserDetail username={username} />

//               {/* Remove user button */}
//               <button
//                 className="mt-2 text-red-500 hover:underline self-end"
//                 onClick={() => onRemoveUser(username)}
//                 aria-label={`Remove user ${username}`}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

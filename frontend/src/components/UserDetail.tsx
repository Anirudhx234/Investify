// import { useFetchUsernameQuery } from "../api/clients";

// interface UserDetailProps {
//   username: string;
// }

// export function UserDetail({ username }: UserDetailProps) {
//   const { data, isLoading, isError } = useFetchUsernameQuery({ username });
//     console.log(data);
//   if (isLoading) {
//     return <div>Loading details for {username}...</div>;
//   }

//   if (isError || !data) {
//     return <div>Failed to load details for {username}.</div>;
//   }

//   // Assuming `data` contains fields like `name`, `email`, etc.
//   return (
//     <div>
//       <p> <strong>Email:</strong> {data.email}</p>
//       <p> <strong>UserName:</strong> {data.username}</p>
//       <button className="items-center">View Profile</button>
//     </div>
//   );
// }

import {useParams} from "wouter";
import {useUserProfileQuery} from "../api/clients.ts";

export default function UserProfileInfo() {
    const params = useParams() as { id: string };

    const userProfile = useUserProfileQuery({ id: params.id });

    return (
        <div>
            <h1>{params.id}</h1>
            <h1>{userProfile.data?.username}</h1>
        </div>
    );
}
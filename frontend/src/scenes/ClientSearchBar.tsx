import type { ChangeEvent } from "react";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import {
  useCreateFriendRequestMutation,
  useGetClientsQuery,
} from "../api/social";
import { RecursiveMenu } from "../components/RecursiveMenu";
import { ProfilePicture } from "../components/ProfilePicture";
import { Link } from "wouter";
import { useAppSelector } from "../hooks/useAppSelector";
import { useLoggedInClientProfileQuery } from "../api/clients";
import { useToastForRequest } from "../hooks/useToastForRequests";

export function ClientSearchBar() {
  const loggedInClientId = useAppSelector((state) => state.client.id);

  const [searchValue, setSearchValue] = useState("");
  const isExpanded = !!searchValue;

  const { data: loggedInClientData } = useLoggedInClientProfileQuery();
  const friendIds = loggedInClientData?.friends?.map((e) => e.id);

  const { isFetching, isError, error, isSuccess, data } = useGetClientsQuery();
  const [createFriend, createFriendState] = useCreateFriendRequestMutation();
  useToastForRequest("Create Friend Request", createFriendState, {
    backupSuccessMessage: "Created Friend Request",
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };

  const searchItems = data
    ?.filter(
      (e) =>
        e.id !== loggedInClientId &&
        !friendIds?.includes(e.id) &&
        e.username.includes(searchValue),
    )
    .map((e) => ({ ...e, key: e.id }));

  return (
    <div className="flex ~w-80/[50rem]">
      <label className="relative mx-3 w-full">
        <FaSearch className="pointer-events-none absolute z-10 my-4 ms-4 stroke-current text-base-content opacity-60" />
        <div
          role="combobox"
          aria-haspopup="listbox"
          aria-controls="search-listbox"
          aria-expanded={isExpanded}
          id="search-container"
          className="dropdown relative w-full"
        >
          <form>
            <label className="hidden" id="search-label" htmlFor="search-input">
              Search
            </label>
            <input
              name="search"
              id="search-input"
              type="search"
              placeholder="Search..."
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls="search-listbox"
              aria-labelledby="search-label"
              className="input input-bordered w-full ps-10"
              value={searchValue}
              onChange={handleSearchChange}
            />
            {isExpanded && (
              <div className="dropdown-content z-1 max-h-[30rem] w-full overflow-y-auto rounded-box bg-base-200 p-4 shadow">
                {isError && (
                  <div className="flex items-center gap-2 text-error">
                    <MdErrorOutline />
                    <p>{error.message}</p>
                  </div>
                )}
                {isFetching && (
                  <div className="flex items-center gap-2">
                    <span className="loading loading-spinner"></span>
                    <p>Loading...</p>
                  </div>
                )}
                {isSuccess && searchItems && searchItems.length === 0 && (
                  <p className="italic">No Items</p>
                )}
                {isSuccess && searchItems && (
                  <RecursiveMenu
                    menuItems={{ i: searchItems }}
                    renderItem={(i) => (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ProfilePicture
                            src={i.profilePicture ?? "default-profile.svg"}
                          />
                          <Link href={`~/clients/${i.id}`} className="link">
                            {i.username}
                          </Link>
                        </div>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            createFriend({ friendId: i.id })
                              .unwrap()
                              .catch(() => {});
                          }}
                        >
                          Add
                        </button>
                      </div>
                    )}
                  />
                )}
              </div>
            )}
          </form>
        </div>
      </label>
    </div>
  );
}

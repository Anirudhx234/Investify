import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  // Array of usernames to search from
  const usernames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

  const [query, setQuery] = useState<string>('');
  const [filteredUsernames, setFilteredUsernames] = useState<string[]>([]);

  // Handle search logic
  const handleSearch = (query: string) => {
    setQuery(query);

    // Filter usernames based on the query
    const matches = usernames.filter(username =>
      username.toLowerCase().includes(query.toLowerCase())
    );

    // Update filtered results or show "can't find user"
    setFilteredUsernames(matches.length > 0 ? matches : ['Can\'t find user']);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <SearchBar onSearch={handleSearch} initialQuery="Bob" />

      {query && (
        <div className="relative mt-2 w-full max-w-md">
          <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-full">
            {filteredUsernames.map((username, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {username}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;

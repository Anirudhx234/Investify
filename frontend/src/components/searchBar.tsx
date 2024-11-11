import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState<string>(initialQuery);

  useEffect(() => {
    onSearch(query); // Trigger search on every query change
  }, [query, onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch(''); // Reset search when clearing
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center border border-gray-300 rounded-lg p-2">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="flex-grow outline-none px-2"
        />
        {query && (
          <button
            onClick={handleClear}
            className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

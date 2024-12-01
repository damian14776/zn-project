import React from 'react';

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
    return (
        <div className="mb-4 flex">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search posts..."
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
    );
};

export default SearchBar;

// SearchBar.tsx
import React from 'react';

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search posts..."
                className="w-full p-2 border rounded-md shadow-sm"
            />
        </div>
    );
};

export default SearchBar;

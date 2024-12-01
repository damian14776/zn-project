import React, { useState } from 'react';

interface FilterColumnProps {
    onSearch: (query: string) => void;
}

const FilterColumn: React.FC<FilterColumnProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Handler for the search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Handler for the search button click or form submit
    const handleSearch = () => {
        onSearch(searchQuery); // Pass the query to the parent component
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
            {/* Search Bar */}
            <div className="mb-6">
                <label htmlFor="search" className="text-lg font-semibold text-gray-800">
                    Search Posts
                </label>
                <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyUp={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter
                    className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search by title or content"
                />
                <button
                    onClick={handleSearch}
                    className="w-full mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Search
                </button>
            </div>

            {/* Other Filters (Example: Categories, Date Range, etc.) */}
            <div className="space-y-4">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">Filter by Category</h4>
                    <select className="w-full p-2 border rounded-md border-gray-300">
                        <option value="">All Categories</option>
                        <option value="tech">Technology</option>
                        <option value="life">Lifestyle</option>
                        <option value="business">Business</option>
                    </select>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-gray-800">Filter by Date</h4>
                    <input
                        type="date"
                        className="w-full p-2 border rounded-md border-gray-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterColumn;

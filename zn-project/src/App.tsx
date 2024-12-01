import React, { useState } from 'react';
import PostDisplay from "../components/PostDisplay";
import SearchBar from '../components/SearchBar';
import FilterColumn from "../components/FilterColumn";
import Header from "../components/Header";

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false); // State for showing the filter dropdown

    // Handle search input change
    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    // Handle filter change
    const handleFilterChange = (userId: string) => {
        setSelectedUserId(userId);
        setIsFilterOpen(false); // Close the filter dropdown after selecting
    };

    return (
        <div className="App">
            <Header />

            {/* Search Bar Container */}
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                </div>
            </div>

            {/* Main Content Container: Flexbox for Desktop and Stack for Mobile */}
            <div className="container mx-auto flex flex-col sm:flex-row">

                {/* Mobile: Filter Column Button (Toggle Dropdown) */}
                <div className="sm:hidden w-full mb-4">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full px-4 py-2 bg-zngly-green text-white rounded-md hover:bg-green-400"
                    >
                        Filter Posts
                    </button>
                    {isFilterOpen && (
                        <div className="mt-4 w-full bg-white p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
                            <FilterColumn onFilter={handleFilterChange}  selectedUserId={selectedUserId}/>
                        </div>
                    )}
                </div>


                {/* Desktop: Post Display (Left Side) and Filter Column (Right Side) */}
                <div className="sm:w-3/4 mb-4">
                    <PostDisplay searchQuery={searchQuery} selectedUserId={selectedUserId} />
                </div>

                {/* Desktop: FilterColumn always visible on the right */}
                <div className="hidden sm:block sm:w-1/4 m-4">
                    <FilterColumn onFilter={handleFilterChange}  selectedUserId={selectedUserId}/>
                </div>
            </div>
        </div>
    );
};

export default App;

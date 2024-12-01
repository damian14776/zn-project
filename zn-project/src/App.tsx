import React, { useState, useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';
import PostDisplay from "../components/PostDisplay";
import SearchBar from '../components/SearchBar';
import FilterColumn from "../components/FilterColumn";
import Header from "../components/Header";
import { fetchPosts, fetchPhotos, fetchUsers } from '../services/app'; // Import all API functions

function App() {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    return (
      <div className="App">
          <Header />
          <div className="container mx-auto p-6">
              <div className="flex-1 mr-12">
                  <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
              </div>
          </div>
          <div className="container mx-auto  flex">
              {/* Left Section: SearchBar */}
              <div className="flex-1 mr-6">
                  <PostDisplay searchQuery={searchQuery} />
              </div>

              {/* Right Section: FilterColumn */}
              <div className="w-1/4">
                  <FilterColumn />
              </div>
          </div>
      </div>
  );
}

export default App;

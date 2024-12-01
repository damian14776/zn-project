import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostDisplay from "../components/PostDisplay";
import SearchBar from '../components/SearchBar';

function App() {
  return (
    <div className="App">
      <h1 className="max-w-4xl mx-auto p-4 bg-blue-100">Simple Post Fetcher App</h1>
       <SearchBar />
      <PostDisplay />
    </div>
  );
}

export default App;

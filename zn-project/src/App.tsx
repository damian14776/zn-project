import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostDisplay from "../components/PostDisplay";

function App() {
  return (
    <div className="App">
      <h1 className="max-w-4xl mx-auto p-4 bg-amber-100">Simple Post Fetcher App</h1>
      <PostDisplay />
    </div>
  );
}

export default App;

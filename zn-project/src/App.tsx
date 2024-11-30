import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostDisplay from "../components/PostDisplay";

function App() {
  return (
    <div className="App">
      <h1>Simple Post Fetcher App</h1>
      <PostDisplay />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import PokemonContainer from "./components/PokemonContainer";
import './index.css'; 


function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">Pokédex</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <PokemonContainer searchTerm={searchTerm} />
    </div>
  );
}

export default App;

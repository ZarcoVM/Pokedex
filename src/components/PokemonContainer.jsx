// components/PokemonContainer.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import LoadMoreButton from "./LoadMoreButton";

const PokemonContainer = ({ searchTerm }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const details = await Promise.all(
          response.data.results.map((pokemon) => axios.get(pokemon.url))
        );
        setPokemonList(details.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    }
    fetchPokemon();
  }, [limit]);

  const filtered = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMorePokemon = () => {
    setLimit((prevLimit) => prevLimit + 20);
  };

  return (
    <div>
      <div className="grid">
        {filtered.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <LoadMoreButton onClick={loadMorePokemon} />
    </div>
  );
};

export default PokemonContainer;

import React from 'react';
import { Pokemon, PokemonId } from "../../types";
import "../styling/PokemonTeam.css";

interface PokemonTeamProps {
  pokemons: Pokemon[];
  onSelectPokemon?: (pokemon: Pokemon) => void;
  readOnly?: boolean;
  playedPokemons?: PokemonId[];
}

const PokemonTeam: React.FC<PokemonTeamProps> = ({ pokemons, onSelectPokemon, readOnly, playedPokemons }) => {
  return (
    <div className="pokemon-team">
      <ul>
        {pokemons.map((pokemon) => {
          // Determine if the current pokemon is in the playedPokemons array
          const isPlayed = playedPokemons && playedPokemons.includes(pokemon.id);
          // Apply "played" class only if playedPokemons is provided and contains the pokemon.id
          const className = `${readOnly ? 'read-only' : ''} ${isPlayed ? 'played' : ''}`;
          
          return (
            <li key={pokemon.id} className={className} onClick={() => !readOnly && !isPlayed && onSelectPokemon && onSelectPokemon(pokemon)}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PokemonTeam;

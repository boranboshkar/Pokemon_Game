import { Pokemon, PokemonStats } from "../../../types";
import "../../styling/PokemonDetails.css";

interface Props {
  pokemonStats: PokemonStats[];
  pokemon: Pokemon;
}

const PokemonDetails = ({ pokemon, pokemonStats }: Props) => {
  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      <p>Type: {pokemon.types.type}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <div className="pokemon-stats">
        <p>HP: {pokemon.stats.hp}</p>
        <p>Attack: {pokemon.stats.attack}</p>
        <p>Defense: {pokemon.stats.defense}</p>
        <p>Special Attack: {pokemon.stats.specialAttack}</p>
        <p>Special Defense: {pokemon.stats.specialDefense}</p>
        <p>Speed: {pokemon.stats.speed}</p>
      </div>
      <div className="pokemonStats">
        {pokemonStats.map((stat) =>
          stat.id === pokemon.id ? (
            <>
              <p>Wins: {stat.wins}</p>
              <p>Losses: {stat.losses}</p>
              <p>
                {stat.wins+stat.losses>0?((stat.wins * 100) / (stat.wins + stat.losses)).toFixed(2) + "% win Rate":"0% win Rate"}
              </p>
            </>
          ) : null
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;

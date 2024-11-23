import Buttons from "../Buttons";
import "../../styling/PokemonScreen.css";
import PokemonTeam from "../PokemonTeam";
import PokemonDetails from "./PokemonDetails";
import { useEffect, useState } from "react";
import { GameState, Pokemon, PokemonStats } from "../../../types";

interface Props {
  onBattle: () => void;
  userPokemons: Pokemon[];
  pokemonsStats: PokemonStats[];
  gameState: GameState;
}

const PokemonScreen = ({
  onBattle,
  userPokemons,
  gameState,
  pokemonsStats,
}: Props) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handleSelectPokemon = (pokemon: Pokemon) => {
    if (selectedPokemon === pokemon) {
      setSelectedPokemon(null);    
    }else
    setSelectedPokemon(pokemon);
  };

  useEffect(() => {
    setSelectedPokemon(null);
  }, [userPokemons]);

  return (
    <div className="pokemon-screen">
      <div className="header">
        <h1>My Pokemon</h1>
        <h6>Choose a Pokemon to see its details</h6>
      </div>
      <div className="content">
        <PokemonTeam
          onSelectPokemon={handleSelectPokemon}
          pokemons={userPokemons}
        />
        {!selectedPokemon && <h3 className="NoPokemonMessage">No Pokemon is Selected</h3>}
        {selectedPokemon && (
          <PokemonDetails
            pokemonStats={pokemonsStats}
            pokemon={selectedPokemon}
          ></PokemonDetails>
        )}
      </div>
      <Buttons id="battle" onBattle={onBattle} />
      
      <div className={`statusMessage ${gameState.number_of_battles === 0 ? 'initial' : 'stats'}`}>
  {gameState.number_of_battles === 0 ? (
    "You haven't played yet ..."
  ) : (
    <>
      {"You won " +
        gameState.wins +
        " out of " +
        gameState.number_of_battles +
        " battles "}
      <span className="winPercentage">
        {((gameState.wins / gameState.number_of_battles) * 100).toFixed(2) + "%"}
      </span>
    </>
  )}
</div>


    </div>
  );
};

export default PokemonScreen;

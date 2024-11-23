import { useEffect } from "react";
import { Result, PokemonStats, GameState } from "../../../types";
import '../../styling/Message.css';

interface Props {
  roundResult: Result;
  currentBattlePokemonsStats: PokemonStats[];
  setPokemonsStats: (stats: PokemonStats[]) => void;
  setGameState: (state: GameState) => void;
  onNewRound: () => void;
  isEndOfGame: () => boolean;
  gamestate: GameState;
  pokemonStats: PokemonStats[];
  onBattleFinish: ()=>void; 
  
}

const Message = ({
  roundResult,
  currentBattlePokemonsStats,
  isEndOfGame,
  onNewRound,
  gamestate,
  setPokemonsStats,
  setGameState,
  pokemonStats,
  onBattleFinish
}: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if(!isEndOfGame()){
        onNewRound();
      }
      else{
        onBattleFinish();
      }
      
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getEndGameMessage = () => {
    const winningPokemons = currentBattlePokemonsStats.filter(
      (pokemon) => pokemon.wins > 0
    );
    const updatePokemonStats = () => {
      const updatedStats: PokemonStats[] = currentBattlePokemonsStats.reduce((acc, pokemon) => {
        const pokemonStat = pokemonStats.find((stat) => stat.id === pokemon.id);
        if (pokemonStat) { // Ensure pokemonStat exists before proceeding
          const updatedStat: PokemonStats = {
            id: pokemonStat.id,
            wins: pokemonStat.wins + (pokemon.wins > 0 ? 1 : 0),
            losses: pokemonStat.losses + (pokemon.wins > 0 ? 0 : 1),
          };
          acc.push(updatedStat);
        }
        return acc;
      }, [] as PokemonStats[]);
      setPokemonsStats(updatedStats);
    };
    const message = winningPokemons.length >= 2 ? "You won!" : "You lost!";
    const newGameState: GameState = {
      ...gamestate,
      number_of_battles: gamestate.number_of_battles + 1,
      wins: gamestate.wins + (winningPokemons.length >= 2 ? 1 : 0),
    };
    useEffect(() => {
      updatePokemonStats();
      setGameState(newGameState);
    }, []);
    return message;
  };

  const getMessage = () => {
    if (!isEndOfGame()) {
      return roundResult === "Win" ? "Your Pokémon won!" : "Your Pokémon lost!";
    } else {
      return getEndGameMessage();
    }
  };

  return (
    <div
      className={`battle-message ${
        !isEndOfGame()
          ? roundResult === "Win"
            ? "win-message"
            : "loss-message"
          : "end-game-message"
      }`}
    >
      {getMessage()}
    </div>
  );
  
};

export default Message;

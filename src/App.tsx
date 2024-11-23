import Buttons from "./components/Buttons";
import PokemonScreen from "./components/pokemonScreen/PokemonScreen";
import BattleScreen from "./components/battleScreen/BattleScreen"; 
import usePersistedState from "./CustomHooks/usePersistedState";
import { GameState, Pokemon, PokemonStats } from "../types"; 
import { useState, useEffect } from "react";
import { fetch3RandomPokemons } from "./GetFromServer";

function App() {
  const [userPokemons, setUserPokemons, clearUserPokemons] = usePersistedState<Pokemon[]>(
    "userPokemons",
    []
  );
  const [botPokemons, setbotPokemons, clearBotPokemons] = usePersistedState<Pokemon[]>(
    "botPokemons",
    []
  );
  const [gameState, setGameState, clearGameState] = usePersistedState<GameState>("GameState", {wins :0, number_of_battles: 0})
  const [pokemonsStats, setPokemonsStats, clearPokemonsStats] = usePersistedState<PokemonStats[]>("PokemonStats", [])
  const [currentScreen, setCurrentScreen] = useState("PokemonScreen");

  const handleBattleStart = () => {
    setCurrentScreen("Battle");
  };

  useEffect(() => {
    const updateUserPokemons = async () => {
      if (userPokemons.length === 0 && pokemonsStats.length === 0) {
        try {
          const pokemons: Pokemon[] = await fetch3RandomPokemons();
          setUserPokemons(pokemons);
          const initialValues: PokemonStats[] = pokemons.map((pokemon: Pokemon) => ({
            id: pokemon.id,
            wins: 0,
            losses: 0,
          }));
          setPokemonsStats(initialValues);
        } catch (error) {
          console.error("Failed to fetch user pokemons:", error);
        }
      }
    };
    updateUserPokemons();
  }, [userPokemons]);


  useEffect(() => {
    const updateBotPokemons = async () => {
      if (botPokemons.length === 0) {
        try {
          const pokemons :Pokemon[] = await fetch3RandomPokemons();
          setbotPokemons(pokemons);
        } catch (error) {
          console.error("Failed to fetch bot pokemons:", error);
        }
      }
    };
    updateBotPokemons();
  }, [botPokemons]);

  const handleStartOver = () => {
    clearUserPokemons();
    clearPokemonsStats(); 
    clearGameState(); 
    clearBotPokemons(); 
    setCurrentScreen("PokemonScreen")
  };
  const onBattleFinish = ()=>{
    clearBotPokemons(); 
    setCurrentScreen("PokemonScreen")
  }
  return (
    <div>
      <Buttons id="startOver" onStartOver= {handleStartOver} />
      {currentScreen === "PokemonScreen" && (
        <PokemonScreen onBattle={handleBattleStart} pokemonsStats = {pokemonsStats} gameState={gameState} userPokemons={userPokemons} />
      )}
      {currentScreen === "Battle" && <BattleScreen gameState = {gameState} pokemonsStats= {pokemonsStats} botPokemons={botPokemons} userPokemons={userPokemons} setGameState={setGameState} setPokemonsStats={setPokemonsStats} onBattleFinish={onBattleFinish} />}
    </div>
  );
}

export default App;

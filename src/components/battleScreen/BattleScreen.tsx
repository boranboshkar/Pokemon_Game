import React, { useState } from 'react';
import PokemonTeam from "../PokemonTeam";
import PokemonCard from "./PokemonCard";
import MovesCard from "./MovesCard";
import { GameState, Pokemon, PokemonStats, Move, Result, PokemonId} from "../../../types";
import "../../styling/BattleScreen.css"
import Message from './Message';
import RoundResults from "./RoundResults"


interface BattleScreenProps {
  userPokemons: Pokemon[];
  botPokemons: Pokemon[];
  pokemonsStats: PokemonStats[];
  gameState: GameState;
  setPokemonsStats: (stats: PokemonStats[]) => void; 
  setGameState: (state: GameState) => void;
  onBattleFinish: ()=>void; 
  
};

const BattleScreen: React.FC<BattleScreenProps> = ({ userPokemons, botPokemons, gameState, pokemonsStats, setGameState, setPokemonsStats, onBattleFinish }) => {
  const [selectedUserPokemon, setSelectedUserPokemon] = useState<Pokemon | null>(null);
  const [selectedBotPokemon, setSelectedBotPokemon] = useState<Pokemon | null>(null);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [botMove, setBotMove] = useState<Move | null>(null);
  const [currentRoundResult, seCurrentRoundResult] = useState<Result>("Playing");
  const [currentBattlePokemonsStats, setCurrentBattlePokemonStats] = useState<PokemonStats[]>([]);
  const [playedBotPokemons, setPlayedBotPokemons] = useState<PokemonId[]>([])
  const [playedUserPokemons, setPlayedUserPokemons] = useState<PokemonId[]>([]);

  const handleSelectUserPokemon = (pokemon: Pokemon) => {
    if (!playedUserPokemons.includes(pokemon.id)) {
      setSelectedUserPokemon(pokemon);
      setPlayedUserPokemons((prev) => [...prev, pokemon.id]);
      const availableBotPokemons = botPokemons.filter(p => !playedBotPokemons.includes(p.id));
      const randomPokemonIndex = Math.floor(Math.random() * availableBotPokemons.length);
      const randomBotPokemon = availableBotPokemons[randomPokemonIndex];
      setSelectedBotPokemon(randomBotPokemon);
      setPlayedBotPokemons((prev) => [...prev, randomBotPokemon.id]);
    }
  };

  // Function to handle user selection of move
  const handleSelectMove = (move: Move) => {
    setSelectedMove(move);
    if (selectedBotPokemon) {
      const randomMoveIndex = Math.floor(Math.random() * selectedBotPokemon.moves.length);
      const randomBotMove = selectedBotPokemon.moves[randomMoveIndex];
      setBotMove(randomBotMove);
    }
 
  };
  const clearRound = ()=>{
    setSelectedBotPokemon(null)
    setSelectedUserPokemon(null)
    setBotMove(null)
    setSelectedMove(null)
    seCurrentRoundResult("Playing")
  }

  const isBattleFinished  =()=>{
    return currentBattlePokemonsStats.length === 3;
  }
  return (
    <div className="battle-screen">
      <h1>Battle Screen</h1>
      {currentRoundResult==="Playing"&&<h4 className='RoundNum'>Round {currentBattlePokemonsStats.length+1}</h4>}
      {/* Display Pokemons in battle */}
      {!selectedUserPokemon ? (
        <div >
        <PokemonTeam pokemons={botPokemons} readOnly={true} playedPokemons={playedBotPokemons} />
        {!selectedUserPokemon && <h5>Choose your Pokemon :</h5>}
        <PokemonTeam pokemons={userPokemons} onSelectPokemon={handleSelectUserPokemon} playedPokemons={playedUserPokemons} />
        </div>
      ) : (
        <>
          {selectedBotPokemon && (
            <div className="bot-section">
              <PokemonCard pokemon={selectedBotPokemon} />
              <MovesCard moves={selectedBotPokemon.moves} readOnly />
            </div>
          )}
          {/* Checking who won */}
          {selectedBotPokemon && selectedMove && botMove &&currentRoundResult ==="Playing" 
           && <RoundResults userPokemon={selectedUserPokemon} botPokemon={selectedBotPokemon} setRoundResult={seCurrentRoundResult} botMove={botMove} userMove={selectedMove} setCurrentBattlePokemonStats={setCurrentBattlePokemonStats} currentBattlePokemonsStats={currentBattlePokemonsStats} /> }
          {/* Round/Battle Finished */}
          {currentRoundResult!="Playing" && currentBattlePokemonsStats &&
             <Message setGameState={setGameState} setPokemonsStats={setPokemonsStats} currentBattlePokemonsStats={currentBattlePokemonsStats} roundResult={currentRoundResult} onNewRound={clearRound} isEndOfGame={isBattleFinished} gamestate={gameState} pokemonStats={pokemonsStats} onBattleFinish={onBattleFinish}/>}
            
            <PokemonCard pokemon={selectedUserPokemon} />
            {!selectedMove && <h5>Choose your move :</h5>}
            <MovesCard moves={selectedUserPokemon.moves} onSelectMove={handleSelectMove} readOnly = {selectedMove?true:false} />
        </>
      )}
    </div>  
  );
};

export default BattleScreen;
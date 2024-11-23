import { Move, Pokemon, Result, PokemonStats } from "../../../types";
import { useEffect, useState } from "react";
import "../../styling/RoundResults.css";

interface Props {
  userPokemon: Pokemon;
  botPokemon: Pokemon;
  setRoundResult: (roundResults: Result) => void;
  botMove: Move;
  userMove: Move;
  setCurrentBattlePokemonStats: (pokemonStats: PokemonStats[]) => void;
  currentBattlePokemonsStats: PokemonStats[];
}

const calculateTotalPower = (
  attackerPokemon: Pokemon,
  attackedPokemon: Pokemon,
  move: Move
) => {
  let TF = 1;
  if (attackerPokemon.types.noDamageTo.includes(attackedPokemon.types.type))
    TF = 0;
  if (attackerPokemon.types.halfDamageTo.includes(attackedPokemon.types.type))
    TF = 0.5;
  if (attackerPokemon.types.doubleDamageTo.includes(attackedPokemon.types.type))
    TF = 2;
  return (
    (move.power + attackerPokemon.stats.attack) * TF -
    attackedPokemon.stats.defense
  );
};

const RoundResults = ({
  userPokemon,
  botPokemon,
  setRoundResult,
  botMove,
  userMove,
  setCurrentBattlePokemonStats,
  currentBattlePokemonsStats,
}: Props) => {
  const [userTotalPower, setUserTotalPower] = useState(0);
  const [botTotalPower, setBotTotalPower] = useState(0);

  useEffect(() => {
    setUserTotalPower(calculateTotalPower(userPokemon, botPokemon, userMove));
    setBotTotalPower(calculateTotalPower(botPokemon, userPokemon, botMove));
  }, []);

  const updatedStats = currentBattlePokemonsStats.map((stat) => {
    if (stat.id === userPokemon.id) {
      return userTotalPower >= botTotalPower
        ? { ...stat, wins: stat.wins + 1 }
        : { ...stat, losses: stat.losses + 1 };
    }
    return stat;
  });
  if (!updatedStats.some((stat) => stat.id === userPokemon.id)) {
    updatedStats.push({
      id: userPokemon.id,
      wins: userTotalPower >= botTotalPower ? 1 : 0,
      losses: userTotalPower < botTotalPower ? 1 : 0,
    });
  }
  
    useEffect(() => {
    const timer = setTimeout(() => {
      console.log('userTotalPower', userTotalPower)
      console.log('botTotalPower',botTotalPower)
      setRoundResult(userTotalPower >= botTotalPower ? "Win" : "Loss");
      setCurrentBattlePokemonStats(updatedStats);
    }, 3000);
    return () => clearTimeout(timer);
}, [userTotalPower,botTotalPower]);
  
return (
    <>
      <div className="round-result bot-move">
        {botMove.name} {">>"} {botTotalPower}
      </div>
      <div className="round-result user-move">
        {userMove.name} {">>"} {userTotalPower}
      </div>
    </>
  );
};

export default RoundResults;

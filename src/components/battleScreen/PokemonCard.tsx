
import {Pokemon } from "../../../types" 
import "../../styling/MovesCard.css"
interface PokemonCardProps {
    pokemon: Pokemon;
  }
  
  const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    return (
      <div className="selected-pokemon-card">
        <h3>{pokemon.name}</h3>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
    );
  };
  
  export default PokemonCard;
  
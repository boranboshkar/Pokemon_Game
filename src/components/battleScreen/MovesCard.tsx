import {Move } from "../../../types" 
import "../../styling/MovesCard.css"
interface MovesCardProps {
  moves: Move[];
  onSelectMove?: (move: Move) => void;
  readOnly?: boolean;
}

const MovesCard: React.FC<MovesCardProps> = ({ moves, onSelectMove, readOnly = false }) => {
  return (
    <div className="moves-card">
      {moves.map((move) => (
        <button
          key={move.name}
          onClick={() => !readOnly && onSelectMove && onSelectMove(move)}
          disabled={readOnly}
        >
          {move.name} ({move.power})
        </button>
      ))}
    </div>
  );
};

export default MovesCard;
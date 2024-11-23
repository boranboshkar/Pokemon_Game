import '../styling/Buttons.css';

interface Props {
  id : "startOver" | "battle";
  onBattle?: () => void;
  onStartOver?: () => void;
}

const Buttons = ({ id,onBattle,onStartOver }:Props) => {
  return (
    <>
      <button className={id === "startOver" ? "startOver" : "battle"} onClick={id=="startOver"? onStartOver: onBattle}>
        {id === "startOver" ? "Start Over" : "Let\'s Battle!"}
      </button> 
    </>
  );
}

export default Buttons
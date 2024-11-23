export type Move = {
  name: string;
  power: number;
  
};

export type Result = "Win" | "Loss" | "Playing";

export type GameState = {
  wins: number;
  number_of_battles: number;  
};

export type PokemonId = number; 

export type PokemonStats = {
  id: number; 
  wins : number; 
  losses: number;
};

export type info = {
  type: string;
  noDamageTo: string[];
  halfDamageTo: string[];
  doubleDamageTo: string[];
};

export type Pokemon = {
  height: number;
  id: number;
  moves: Move[];
  name: string;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  types: info;
  weight: number;
};


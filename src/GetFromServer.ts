import { Pokemon } from '../types';
import { Move } from '../types';

const get4RandomMoves = async (moves: any[]): Promise<Move[]> => {
    const randomMoves: Move[] = [];
    const addedMoves = new Set(); 
    while (randomMoves.length < Math.min(4, moves.length)) {
      const randomIndex = Math.floor(Math.random() * moves.length);
      const randomMove = moves[randomIndex].move;
  
      if (addedMoves.has(randomMove.name)) {
        continue; 
      }
      const response = await fetch(randomMove.url);
      const moveDetails = await response.json();
      randomMoves.push({
        name: randomMove.name,
        power: moveDetails.power || 0, 
      });
      addedMoves.add(randomMove.name);
    }
    return randomMoves;
  };
  
  const fetchDamageRelations = async (url: string) => {
    const response = await fetch(url);
    const damageRelations = await response.json();
    return damageRelations;
  };
  const getNoDamageTo = async (doc :any) => {
    return doc.damage_relations.no_damage_to.map((type: any) => type.name);
  };
  const getHalfDamageTo = async (doc :any) => {
    return doc.damage_relations.half_damage_to.map((type: any) => type.name);
  };
  const getDoubleDamageTo = async (doc :any) => {
    return doc.damage_relations.double_damage_to.map((type: any) => type.name);
  };

export const fetch3RandomPokemons = async (): Promise<Pokemon[]> => {
try {
    const ids = Array.from({ length: 3 }, () => Math.floor(Math.random() * 386) + 1);
    const pokemonsJson = await Promise.all(
        ids.map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return response.json();
        })
    );

    const pokemons: Pokemon[] = await Promise.all(pokemonsJson.map(async (pokemonJson) => ({
        height: pokemonJson.height,
        id: pokemonJson.id,
        moves: await get4RandomMoves(pokemonJson.moves),
        name: pokemonJson.name,
        sprites: pokemonJson.sprites,
        stats: {
            hp: (pokemonJson.stats.find((s: any) => s.stat.name === 'hp').base_stat),
            attack: pokemonJson.stats.find((s: any) => s.stat.name === 'attack').base_stat,
            defense: pokemonJson.stats.find((s: any) => s.stat.name === 'defense').base_stat,
            specialAttack: pokemonJson.stats.find((s: any) => s.stat.name === 'special-attack').base_stat,
            specialDefense: pokemonJson.stats.find((s: any) => s.stat.name === 'special-defense').base_stat,
            speed: pokemonJson.stats.find((s: any) => s.stat.name === 'speed').base_stat,
        },
         types : {
          type: pokemonJson.types[0].type.name,
          noDamageTo: await getNoDamageTo(await fetchDamageRelations(pokemonJson.types[0].type.url)),
          halfDamageTo: await getHalfDamageTo(await fetchDamageRelations(pokemonJson.types[0].type.url)),
          doubleDamageTo: await getDoubleDamageTo(await fetchDamageRelations(pokemonJson.types[0].type.url)),
        },
        weight: pokemonJson.weight,
    })));

    return pokemons;
} catch (error) {
    console.error("Error fetching random Pokémon:", error);
    return [];
}
};



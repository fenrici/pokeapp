import '../../styles/PokemonList.css';
import PokemonCard from '../PokemonCard';

function PokemonList({ pokemons }) {
  if (!pokemons.length) {
    return (
      <p className="no-results">
        Busca un Pokémon
      </p>
    );
  }

  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList; 
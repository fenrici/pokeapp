import '../../styles/PokemonList.css';
import PokemonCard from '../PokemonCard';

// Componente que muestra la lista de Pokémon
function PokemonList({ pokemons }) {
  // Si no hay Pokémon, muestra un mensaje
  if (!pokemons.length) {
    return (
      <p className="no-results">
        Busca un Pokémon
      </p>
    );
  }

  // Muestra la lista de Pokémon en un grid
  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList; 
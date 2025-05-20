import { useNavigate } from 'react-router-dom';
import '../../styles/PokemonCard.css';

function PokemonCard({ pokemon }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Si es un pokemon personalizado (tiene image en lugar de sprites)
    if (pokemon.image) {
      const params = new URLSearchParams({
        name: pokemon.name,
        image: pokemon.image,
        typeOne: pokemon.typeOne,
        typeTwo: pokemon.typeTwo || '',
        height: pokemon.height || '',
        weight: pokemon.weight || ''
      });
      navigate(`/pokemon/${pokemon.id}?${params.toString()}`);
    } else {
      // Si es un pokemon de la API
      navigate(`/pokemon/${pokemon.id}`);
    }
  };

  // Función para obtener los tipos del pokemon
  const getTypes = () => {
    if (pokemon.types) {
      return pokemon.types.map(t => t.type.name);
    }
    return [pokemon.typeOne, pokemon.typeTwo].filter(Boolean);
  };

  return (
    <div className="pokemon-card" onClick={handleClick}>
      <img 
        className="pokemon-image" 
        src={pokemon.sprites?.front_default || pokemon.image} 
        alt={pokemon.name} 
      />
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <div className="type-badges">
        {getTypes().map((type, index) => (
          <span key={index} className="badge badge-teal">
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard; 
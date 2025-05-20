import { useNavigate } from 'react-router-dom';
import '../../styles/PokemonCard.css';

function PokemonCard({ pokemon }) {
  const navigate = useNavigate();

  // Manejar tanto Pokemon de la API como Pokemon personalizados
  const types = pokemon.types
    ? pokemon.types.map(t => t.type.name) // Pokemon de la API
    : [pokemon.typeOne, pokemon.typeTwo].filter(Boolean); // Pokemon personalizados

  const imageUrl = pokemon.sprites?.front_default || pokemon.image;

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}${imageUrl ? `?image=${imageUrl}` : ''}`);
  };

  return (
    <div className="pokemon-card" onClick={handleClick}>
      <div className="pokemon-card-content">
        <img
          className="pokemon-image"
          src={imageUrl}
          alt={pokemon.name}
        />
        <h2 className="pokemon-name">{pokemon.name}</h2>
        <p className="pokemon-id">#{pokemon.id}</p>
        <div className="pokemon-types">
          {types.map((type) => (
            <span key={type} className="type-badge">
              {type}
            </span>
          ))}
        </div>
        <div className="pokemon-details">
          <p><strong>Altura:</strong> {pokemon.height / 10}m</p>
          <p><strong>Peso:</strong> {pokemon.weight / 10}kg</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard; 
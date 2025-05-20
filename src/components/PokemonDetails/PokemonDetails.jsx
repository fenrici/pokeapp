import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../styles/PokemonDetails.css';

function PokemonDetails() {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Si hay query params, es un pokemon personalizado
        if (searchParams.get('name')) {
          setPokemon({
            id,
            name: searchParams.get('name'),
            image: searchParams.get('image'),
            typeOne: searchParams.get('typeOne'),
            typeTwo: searchParams.get('typeTwo'),
            height: searchParams.get('height'),
            weight: searchParams.get('weight')
          });
        } else {
          // Si no hay query params, es un pokemon de la API
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          setPokemon(response.data);
        }
      } catch (error) {
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id, searchParams]);

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  if (!pokemon) {
    return <p>Pokémon no encontrado</p>;
  }

  return (
    <div className="details-container">
      <div className="details-content">
        <div className="pokemon-header">
          <img 
            className="pokemon-image-large" 
            src={pokemon.sprites?.front_default || pokemon.image} 
            alt={pokemon.name} 
          />
          <h1 className="pokemon-title">{pokemon.name}</h1>
          <p className="pokemon-id">ID: {pokemon.id}</p>
        </div>
        <div className="stats-grid">
          <div className="stats-card">
            <h2 className="stats-title">Detalles</h2>
            <div className="stat-item">Altura: {pokemon.height || 'N/A'}</div>
            <div className="stat-item">Peso: {pokemon.weight || 'N/A'}</div>
            <div className="stat-item">
              <div>Tipos:</div>
              <div className="type-badges">
                {pokemon.types ? (
                  pokemon.types.map(({ type }) => (
                    <span key={type.name} className="badge badge-teal">{type.name}</span>
                  ))
                ) : (
                  [pokemon.typeOne, pokemon.typeTwo].filter(Boolean).map(type => (
                    <span key={type} className="badge badge-teal">{type}</span>
                  ))
                )}
              </div>
            </div>
          </div>
          {!searchParams.get('name') && (
            <div className="stats-card">
              <h2 className="stats-title">Estadísticas Base</h2>
              {pokemon.stats.map(stat => (
                <div key={stat.stat.name} className="stat-item">
                  <span className="stat-name">{stat.stat.name}: </span>
                  <span className="stat-value">{stat.base_stat}</span>
                </div>
              ))}
              <div className="stat-item">
                <div>Habilidades:</div>
                <div className="ability-badges">
                  {pokemon.abilities.map(({ ability }) => (
                    <span key={ability.name} className="badge badge-purple">
                      {ability.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
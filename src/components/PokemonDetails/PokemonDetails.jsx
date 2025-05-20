import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../styles/PokemonDetails.css';

function PokemonDetails() {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Obtener los query params
  const name = searchParams.get('name');
  const image = searchParams.get('image');
  const typeOne = searchParams.get('typeOne');
  const typeTwo = searchParams.get('typeTwo');
  const height = searchParams.get('height');
  const weight = searchParams.get('weight');

  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (name && image && typeOne) {
      setPokemonDetails({
        id,
        name,
        image,
        typeOne,
        typeTwo,
        height,
        weight
      });
      setLoading(false);
      return;
    }
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemonDetails(response.data);
        setLoading(false);
      } catch (error) {
        setPokemonDetails(null);
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [id, name, image, typeOne, typeTwo, height, weight]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!pokemonDetails) {
    return <p className="error-message">Pokemon no encontrado</p>;
  }

// datos a mostrar
  const isCustom = !!name && !!image && !!typeOne;
  const displayName = isCustom ? name : pokemonDetails.name;
  const displayImage = isCustom ? image : pokemonDetails.sprites.front_default;
  const displayHeight = isCustom ? (height || 'N/A') : (pokemonDetails.height / 10 + 'm');
  const displayWeight = isCustom ? (weight || 'N/A') : (pokemonDetails.weight / 10 + 'kg');
  const displayTypes = isCustom
    ? [typeOne, typeTwo].filter(Boolean)
    : pokemonDetails.types.map(t => t.type.name);

  return (
    <div className="details-container">
      <div className="details-content">
        <div className="pokemon-header">
          <img className="pokemon-image-large" src={displayImage} alt={displayName} />
          <h1 className="pokemon-title">{displayName}</h1>
          <p className="pokemon-id">ID: {id}</p>
        </div>
        <div className="stats-grid">
          <div className="stats-card">
            <h2 className="stats-title">Detalles</h2>
            <div className="stat-item">Altura: {displayHeight}</div>
            <div className="stat-item">Peso: {displayWeight}</div>
            <div className="stat-item">
              <div>Tipos:</div>
              <div className="type-badges">
                {displayTypes.map(type => (
                  <span key={type} className="badge badge-teal">{type}</span>
                ))}
              </div>
            </div>
          </div>
          {!isCustom && (
            <div className="stats-card">
              <h2 className="stats-title">Estadísticas Base</h2>
              {pokemonDetails.stats.map(stat => (
                <div key={stat.stat.name} className="stat-item">
                  <span className="stat-name">{stat.stat.name}: </span>
                  <span className="stat-value">{stat.base_stat}</span>
                </div>
              ))}
              <div className="stat-item">
                <div>Habilidades:</div>
                <div className="ability-badges">
                  {pokemonDetails.abilities.map(ability => (
                    <span key={ability.ability.name} className="badge badge-purple">
                      {ability.ability.name}
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
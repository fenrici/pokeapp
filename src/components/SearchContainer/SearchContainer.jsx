import { useState } from 'react';
import Search from '../Search';
import PokemonList from '../PokemonList';
import { usePokemon } from '../../context/PokemonContext';
import axios from 'axios';
import '../../styles/SearchContainer.css';

// Componente que maneja la búsqueda y muestra los Pokémon encontrados
function SearchContainer() {
  // Estados separados democlase
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { pokemons: customPokemons } = usePokemon();

  // Función que maneja la búsqueda de Pokémon
  const handleSearch = async (term) => {
    // Si no hay término de búsqueda, termina
    if (!term.trim()) {
      setError('');
      return;
    }

    try {
      const searchTerm = term.toLowerCase().trim();
      
      // Busca si el Pokémon ya está en la lista
      const existingPokemon = pokemons.find(
        p => p.name === searchTerm || p.id === parseInt(searchTerm)
      );

      if (existingPokemon) {
        setMessage(`${existingPokemon.name} ya está en tu lista`);
        setTimeout(() => setMessage(''), 3000);
        return;
      }

      // Busca en los Pokémon personalizados
      const customPokemon = customPokemons.find(
        p => p.name === searchTerm || p.id === parseInt(searchTerm)
      );

      if (customPokemon) {
        setPokemons(prev => [...prev, customPokemon]);
        return;
      }

      // Si no se encuentra, busca en la API de Pokémon
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
      setPokemons(prev => [...prev, response.data]);
      setError('');
    } catch (error) {
      setError('No se encontró el Pokémon');
      setMessage('');
    }
  };

  return (
    <div className="container">
      <div className="search-section">
        <Search onSearch={handleSearch} />
      </div>
      {error && <div className="error-message">{error}</div>}
      <PokemonList pokemons={pokemons} />
      {message && (
        <div className="toast">
          {message}
        </div>
      )}
    </div>
  );
}

export default SearchContainer; 
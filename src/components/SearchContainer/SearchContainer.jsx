import { useState, useEffect } from 'react';
import Search from '../Search';
import PokemonList from '../PokemonList';
import { usePokemon } from '../../context/PokemonContext';
import axios from 'axios';
import '../../styles/SearchContainer.css';

function SearchContainer() {
  // Estados separados como en el ejemplo de clase
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState('');
  const { pokemons: customPokemons } = usePokemon();

  // useEffect para el montaje inicial
  useEffect(() => {
    console.log('1. Componente montado');
  }, []);

  // useEffect para cambios en el término de búsqueda
  useEffect(() => {
    console.log('2. Término de búsqueda actualizado:', searchTerm);
  }, [searchTerm]);

  // useEffect para la búsqueda de Pokemon
  useEffect(() => {
    const getPokemon = async () => {
      if (!searchTerm || !searchTerm.trim()) {
        setError('');
        return;
      }

      try {
        const term = searchTerm.toLowerCase().trim();
        
        // Verificar si el Pokemon ya está en los resultados
        const existingPokemon = pokemons.find(
          pokemon => pokemon.name === term || pokemon.id === parseInt(term)
        );

        if (existingPokemon) {
          setMessage(`${existingPokemon.name} ya está en tu lista de búsqueda`);
          setShowMessage(true);
          setError('');
          setTimeout(() => setShowMessage(false), 3000);
          return;
        }

        // Verificar si es un Pokemon personalizado
        const customPokemon = customPokemons.find(
          pokemon => pokemon.name === term || pokemon.id === parseInt(term)
        );

        if (customPokemon) {
          setPokemons(prev => [...prev, customPokemon]);
          setMessage(`${customPokemon.name} ha sido añadido a tu lista!`);
          setShowMessage(true);
          setError('');
          setTimeout(() => setShowMessage(false), 3000);
          return;
        }

        // Buscar en la PokeAPI
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${term}`);
        const newPokemon = response.data;
        
        setPokemons(prev => [...prev, newPokemon]);
        setMessage(`${newPokemon.name} ha sido añadido a tu lista!`);
        setShowMessage(true);
        setError('');
        setTimeout(() => setShowMessage(false), 3000);
      } catch (error) {
        setError('No se encontró el Pokemon');
        setMessage('');
        setShowMessage(false);
      }
    };

    getPokemon();
  }, [searchTerm, pokemons, customPokemons]);

  // useEffect para cambios en los pokemons
  useEffect(() => {
    console.log('3. Lista de pokemons actualizada');
  }, [pokemons]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="container">
      <div className="search-section">
        <Search onSearch={handleSearch} />
      </div>
      {error && <div className="error-message">{error}</div>}
      <PokemonList pokemons={pokemons} />
      {showMessage && (
        <div className="toast">
          {message}
        </div>
      )}
    </div>
  );
}

export default SearchContainer; 
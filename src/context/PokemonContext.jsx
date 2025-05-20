import { createContext, useContext, useState } from 'react';

// Crear el contexto para los Pokemon
const PokemonContext = createContext();

// Proveedor del contexto que maneja el estado global de los Pokemon
export function PokemonProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);

  // Función para añadir un nuevo Pokemon
  const addPokemon = (newPokemon) => {
    setPokemons(prevPokemons => [...prevPokemons, newPokemon]);
  };

  const value = {
    pokemons,
    addPokemon
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
}

// Hook personalizado para usar el contexto de Pokemon
export function usePokemon() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon debe ser usado dentro de un PokemonProvider');
  }
  return context;
}

// Lista de tipos de Pokemon disponibles
export const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy'
]; 
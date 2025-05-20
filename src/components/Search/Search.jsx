import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import '../../styles/Search.css';

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedText] = useDebounce(searchTerm, 2300);

  useEffect(() => {
    if (debouncedText) {
      onSearch(debouncedText);
    }
  }, [debouncedText, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-input-group">
      <span className="search-icon">🔍</span>
      <input
        className="search-input"
        type="text"
        placeholder="Ingresa el nombre o número del Pokemon..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search; 
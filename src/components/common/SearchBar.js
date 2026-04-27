// src/components/common/SearchBar.js
// Componente reutilizable para búsqueda

import { useState } from 'react';
import '../../styles/common/SearchBar.css';

const SearchBar = ({ placeholder = 'Buscar...', onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      {searchTerm && (
        <button onClick={handleClear} className="clear-button">
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
import React, { useState, useEffect, useRef } from 'react';
import { searchLocations } from '../services/locationService';

const LocationSearch = ({ setSelectedLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTimeout = useRef(null);

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await searchLocations(searchTerm);
        setSuggestions(results);
      } catch (err) {
        console.error('Search error:', err);
        setError('Kunde inte hitta platsen');
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setSearchTerm(location.name);
    setSuggestions([]);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Sök och välj ort"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Sök efter ort"
        />

        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((location) => (
              <li
                key={location.id}
                onClick={() => handleSelectLocation(location)}>
                <span>{location.name}, </span>
                <span>{location.municipality}</span>
              </li>
            ))}
          </ul>
        )}

        {error && (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;

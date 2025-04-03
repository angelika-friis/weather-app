import React, { useState, useEffect, useRef } from 'react';
import { searchLocations } from '../../services/locationService';
import SearchTextField from '../../components/SearchTextField/SearchTextField';
import SuggestionsList from '../../components/SuggestionsList/SuggestionsList';
import Menu from '../../components/Menu/Menu';
import './SearchBarContainer.css';

const SearchBarContainer = ({ setSelectedLocation, fetchGeoLocation, favorites }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [inFocus, setInFocus] = useState(false);

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
      setError(null);
      try {
        const results = await searchLocations(searchTerm);
        setSuggestions(results);
      } catch (err) {
        console.error('Search error:', err);
        setError('Kunde inte hitta platsen');
      }
    }, 300);
    return () => clearTimeout(searchTimeout.current);
  }, [searchTerm]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div className='search-bar-wrapper'>
      <div className='search-bar-container'>
        <SearchTextField searchTerm={searchTerm} setSearchTerm={setSearchTerm} setInFocus={setInFocus} />
        {inFocus && searchTerm.trim().length === 0 && (
          <Menu favorites={favorites} fetchGeoLocation={fetchGeoLocation} onSelect={handleSelectLocation} />
        )}
        <SuggestionsList suggestions={suggestions} onSelect={handleSelectLocation} />
      </div>
    </div>
  );
};

export default SearchBarContainer;

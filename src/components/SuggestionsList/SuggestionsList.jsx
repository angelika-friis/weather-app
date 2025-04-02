import './SuggestionsList.css'

const SuggestionsList = ({ suggestions, onSelect }) => {
    if (suggestions.length === 0) return null;
    return (
        <ul className='suggestions-list'>
            {suggestions.map((location) => (
                <li key={location.id} onClick={() => onSelect(location)}>
                    <span>{location.name}, </span>
                    <span>{location.municipality}</span>
                </li>
            ))}
        </ul>
    );
};
export default SuggestionsList;
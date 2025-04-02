import { FaSearch } from "react-icons/fa";
import './SearchTextField.css';

const SearchTextField = ({ searchTerm, setSearchTerm, setInFocus }) => {
  return (
    <div className="input-wrapper">
      <FaSearch id='search-icon' />
      <input
        className="input"
        type="text"
        placeholder="Sök och välj ort"
        value={searchTerm}
        onFocus={() => setInFocus(true)}
        onBlur={() => setTimeout(() => setInFocus(false), 200)}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Sök efter ort"
      />
    </div>
  );
};
export default SearchTextField;
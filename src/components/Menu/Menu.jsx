import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import './Menu.css';

const Menu = ({ favorites, fetchGeoLocation, onSelect }) => {
  return (
    <div className="menu">
      <ul>
        <li onClick={fetchGeoLocation}>
          <FaLocationDot className='menu-icon icon' />
          <span>Min position</span>
        </li>
        {favorites.length > 0 && (
          <>
            <p className="header-favorites">Favoriter</p>
            {favorites.map(favorite => (
              <li key={favorite.id} onClick={() => onSelect(favorite)}>
                <FaStar className='menu-icon icon star-icon' />
                <div>
                  <span>{favorite.name}, </span>
                  <span>{favorite.municipality}</span>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};
export default Menu;
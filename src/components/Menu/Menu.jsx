import { FaLocationArrow } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import styles from './Menu.module.css';

const Menu = ({ favorites, fetchGeoLocation, onSelect }) => {
  return (
    <div className={styles.menuContainer}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem} onClick={fetchGeoLocation}>
          <FaLocationArrow className={styles.menuIcon} />
          <span>Min position</span>
        </li>
        {favorites.length > 0 && (
          <>
            <p className={styles.favoritesHeader}>Favoriter</p>
            {favorites.map(favorite => (
              <li key={favorite.id} className={styles.menuItem} onClick={() => onSelect(favorite)}>
                <FaStar className={styles.menuIcon} />
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
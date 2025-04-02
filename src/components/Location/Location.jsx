import { useState, useEffect } from 'react';
import { setCookie } from '../../utils/setCookie.js';
import { FaRegStar, FaStar } from 'react-icons/fa';
import './Location.css';

const Location = ({ location, favorites, setFavorites }) => {

    const [isFavorite, setIsFavorite] = useState(null);

    useEffect(() => {
        if (location && favorites) {
            setIsFavorite(favorites.some(fav =>
                fav.name === location.name &&
                fav.municipality === location.municipality));
        }
    }, [favorites, location])

    const handleClick = () => {
        !isFavorite
            ? addToFavorites(location)
            : removeFromFavorites(location);
    };

    const addToFavorites = (location) => {
        const newFavorites = [...favorites, location];
        setFavorites(newFavorites);
        setCookie('favoriteLocations', newFavorites);
    };

    const removeFromFavorites = (location) => {
        const newFavorites = favorites.filter(fav => fav.id !== location.id);
        setFavorites(newFavorites);
        setCookie('favoriteLocations', newFavorites);
    };


    return (
        <div className='location'>
            {location && (
                <>
                    <button onClick={handleClick}>
                        {isFavorite
                            ? <FaStar />
                            : <FaRegStar />}
                    </button>
                    <div>
                        <h1>{location.name}</h1>
                        <h2>{location.municipality}</h2>
                    </div>
                </>
            )}
        </div>
    );
};

export default Location;
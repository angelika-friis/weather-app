import { useState, useEffect } from 'react';
import { setCookie } from '../../utils/setCookie.js';

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
        <>
            {location && (
                <>
                    <button onClick={handleClick}>
                        {isFavorite ? '★' : '☆'}
                    </button>
                    <h1>{location.name}</h1>
                    <h2>{location.municipality}</h2>
                </>
            )}
        </>
    );
};

export default Location;
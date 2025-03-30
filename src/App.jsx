import { useEffect, useState } from 'react';
import Location from './components/Location/Location';
import ForcastContainer from './containers/ForcastContainer/ForcastContainer';
import LocationSearch from './components/LocationSearch/LocationSearch';
import { reverseGeocode } from './services/locationService';
import { getCookie } from './utils/getCookie.js';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    fetchGeoLocation();
    setFavorites(getCookie('favoriteLocations'))
  }, [])


  useEffect(() => {
    console.log(selectedLocation);
  }, [selectedLocation])

  const fetchGeoLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let coordinates = ({
          lat: parseFloat(position.coords.latitude.toFixed(6)),
          lon: parseFloat(position.coords.longitude.toFixed(6))
        });
        fetchLocationName(coordinates);
      },
      (error) => {
        setError("Error getting location: " + error.message);
      }
    );
  }

  const fetchLocationName = async (coordinates) => {
    try {
      const result = await reverseGeocode(coordinates);

      setSelectedLocation(result);
    } catch (err) {
      console.error("Error fetching location name:", err);
    }
  };


  return (
    <>
      <LocationSearch setSelectedLocation={setSelectedLocation} fetchGeoLocation={fetchGeoLocation} favorites={favorites}/>
      <Location location={selectedLocation} favorites={favorites} setFavorites={setFavorites} />
      {selectedLocation && <ForcastContainer coordinates={selectedLocation.coordinates} />}
    </>
  )
}

export default App;

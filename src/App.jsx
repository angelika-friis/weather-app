import { useEffect, useState } from 'react';
import ContentContainer from './containers/ContentContainer/ContentContainer';
import SearchBarContainer from './containers/SearchBarContainer/SearchBarContainer.jsx';
import Footer from './components/Footer/Footer.jsx';
import { reverseGeocode } from './services/locationService';
import { getCookie } from './utils/getCookie.js';
import './App.css';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [favorites, setFavorites] = useState(null);

  const fallbackCoordinates = {
    lat: 59.329300,
    lon: 18.068600
  };

  useEffect(() => {
    setFavorites(getCookie('favoriteLocations') || []);
  }, []);

  useEffect(() => {
    fetchGeoLocation();
  }, []);

  const fetchGeoLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      fetchLocationName(fallbackCoordinates);
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
        console.error("Error getting location: " + error.message);
      }
    );
  }

  const fetchLocationName = async (coordinates) => {
    try {
      const result = await reverseGeocode(coordinates);

      setSelectedLocation(result);
    } catch (err) {
      console.error("Error fetching location name:", err);
      fetchLocationName(fallbackCoordinates);
    }
  };


  return (
    <div className='App'>
      <SearchBarContainer setSelectedLocation={setSelectedLocation} fetchGeoLocation={fetchGeoLocation} favorites={favorites} />
      {selectedLocation &&
        <ContentContainer coordinates={selectedLocation.coordinates} location={selectedLocation} favorites={favorites} setFavorites={setFavorites} />}
      <Footer />
    </div >
  )
}

export default App;

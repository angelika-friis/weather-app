import { useEffect, useState } from 'react';
import SearchForm from './components/Search/Search';
import GetWeather from './services/WeatherServices';
import GetPlaces from './services/LocationServices';

function App() {
  const [locationList, setLocationList] = useState(null);
  const [showLocation, setShowLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [weather, setWeather] = useState(null);
  const [searchVal, setSearchVal] = useState(null);

  useEffect(() => {
    fetchGeoLocation();
  }, [])

  useEffect(() => {
    // fetchWeather();
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, []);
  
  useEffect(() => {
    if (coordinates) {
      console.log("coordinates is now set:", coordinates);
    }
  }, [coordinates]);

  const fetchGeoLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        setError("Error getting location: " + error.message);
      }
    );
  }

  const fetchWeather = async () => {
    try {
      const newWeather = await GetWeather(coordinates.lon, coordinates.lat);
      console.log('wheather object ', newWeather);
      setWeather(newWeather);
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  };

  const fetchPlaces = async () => {
    try {
      const result = await GetPlaces('Bergsbrunna');

      if (!result) {
        console.error("Location not found");
        return;
      } else if (result.length === 1) {
        setLocation(result[0]);
        setCoordinates({ lat: result.lat, lon: result.lon });
      }
      setLocationList(result);
    } catch (err) {
      console.error("Error fetching places:", err);
    }
  };


  return (
    <>
      <SearchForm searchVal={searchVal} setSearchVal={setSearchVal} locationList={locationList} />
    </>
  )
}

export default App;

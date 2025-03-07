import { useEffect, useState } from 'react';
import SearchForm from './components/Search/Search';
import GetPlaces from './services/LocationServices';
import Weather from './components/Weather/Weather';
import Location from './components/Location/Location';

function App() {
  const [locationList, setLocationList] = useState(null);
  const [showLocation, setShowLocation] = useState(null);
  const [location, setLocation] = useState('Berga');
  const [coordinates, setCoordinates] = useState(null);
  const [searchVal, setSearchVal] = useState('Bergsbrunna');

  useEffect(() => {
    fetchGeoLocation();
  }, [])

  useEffect(() => {
    if (searchVal !== null) {
      fetchPlaces();
    }
  }, [searchVal]);
  
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
          lat: Number(position.coords.latitude.toPrecision(6)),
          lon: Number(position.coords.longitude.toPrecision(6))
        });
      },
      (error) => {
        setError("Error getting location: " + error.message);
      }
    );
  }

  const fetchPlaces = async () => {
    try {
      const result = await GetPlaces(searchVal);

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
      <Location location={location} />
      <Weather coordinates={coordinates} />
    </>
  )
}

export default App;

import { useEffect, useState } from 'react';
import { getPlaces, getPlaceNameFromCoords } from './services/LocationServices';
import SearchForm from './components/Search/Search';
import Location from './components/Location/Location';
import ForcastContainer from './containers/ForcastContainer/ForcastContainer';

function App() {
  const [locationList, setLocationList] = useState(null);
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [searchVal, setSearchVal] = useState('Bergsbrunna');

  useEffect(() => {
    fetchGeoLocation();
  }, [])

  useEffect(() => {
    if (searchVal) {
      //fetchPlaces();
    }
  }, [searchVal]);

  useEffect(() => {
    if (coordinates) {
      fetchLocationName();
    }
  }, [coordinates])

  const fetchGeoLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: parseFloat(position.coords.latitude.toFixed(6)),
          lon: parseFloat(position.coords.longitude.toFixed(6))
        });
      },
      (error) => {
        setError("Error getting location: " + error.message);
      }
    );
  }

  const fetchLocationName = async () => {
    try {
      const result = await getPlaceNameFromCoords(coordinates);

      setLocation({ result });
    } catch (err) {
      console.error("Error fetching location name:", err);
    }
  };

  const fetchPlaces = async () => {
    try {
      const result = await getPlaces(searchVal);

      if (!result) {
        console.error("Location not found");
        return;
      } else if (result.length === 1) {
        setLocation(result[0]);
        setCoordinates({ lat: result.lat, lon: result.lon });
      } else {
        setLocationList(result);
      }
    } catch (err) {
      console.error("Error fetching places:", err);
    }
  };


  return (
    <>
      <SearchForm searchVal={searchVal} setSearchVal={setSearchVal} locationList={locationList} />
      <Location location={location} />
      <ForcastContainer coordinates={coordinates} />
    </>
  )
}

export default App;

import { useEffect, useState } from 'react';
import Location from './components/Location/Location';
import ForcastContainer from './containers/ForcastContainer/ForcastContainer';
import LocationSearch from './components/LocationSearch';
import { reverseGeocode } from './services/locationService';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetchGeoLocation();
  }, [])

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
      <LocationSearch setSelectedLocation={setSelectedLocation} />
      <Location location={selectedLocation} />
      {selectedLocation && <ForcastContainer coordinates={selectedLocation.coordinates} />}
    </>
  )
}

export default App;

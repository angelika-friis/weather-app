import { useEffect, useState } from 'react';
import GetWeather from '../../services/WeatherServices';
import TodaysWeather from '../TodaysWeather/TodaysWeather';
import WeeklyWeather from '../WeeklyWeather/WeeklyWeather';

const Weather = ({ coordinates }) => {

    const [weatherData, setWeatherData] = useState(null);
    const [weatherDataByDay, setWeatherDataByDay] = useState(null);

    useEffect(() => {
        if (coordinates) {
        fetchWeatherData();
        }
    }, [coordinates]);

    useEffect(() => {
        if (weatherData) {
            processWeatherData(weatherData.timeSeries)
        };
    }, [weatherData])

    const fetchWeatherData = async () => {
        try {
          const newWeatherData = await GetWeather(coordinates.lon, coordinates.lat);
          console.log('wheather object ', newWeatherData);
          setWeatherData(newWeatherData);
        } catch (err) {
          console.error("Error fetching weather data:", err);
        }
      };

      const processWeatherData = (timeSeries) => {

        const groupedData = {};

        timeSeries.forEach(entry => {
            const date = entry.validTime.split('T')[0];

            if (!groupedData[date]) {
                groupedData[date] = [];
            }
            groupedData[date].push(entry);
        });
        setWeatherDataByDay(groupedData);
      };
    
      return (
        <>
            {weatherData ? (
                <>
                    <TodaysWeather weatherData={weatherData} />
                    <WeeklyWeather weatherData={weatherDataByDay} />
                </>
            ) : (
                <p>Laddar...</p>
            )}
        </>
    );

}


export default Weather;
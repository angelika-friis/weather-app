import { useEffect, useState } from 'react';
import { getForcast, getSunTime } from '../../services/WeatherServices';
import TodaysForcast from '../TodaysForcast/TodaysForcast';
import WeeklyWeather from '../WeeklyWeather/WeeklyWeather';

const ForcastContainer = ({ coordinates, coordsForForcast, setCoordsForForcast }) => {

    const [weatherData, setWeatherData] = useState(null);
    const [weatherDataByDay, setWeatherDataByDay] = useState(null);
    const [sunTime, setSunTime] = useState(null);

    useEffect(() => {
        if (coordinates) {
            fetchWeatherData();
        }
    }, [coordinates]);

    useEffect(() => {
        if (weatherData) {
            processWeatherData(weatherData.timeSeries)
        }
    }, [weatherData])

    useEffect(() => {
        if (coordinates !== null) {
            fetchSunTime(coordinates);
        }
    }, [coordinates])

    const fetchWeatherData = async () => {
        try {
            const newWeatherData = await getForcast(coordinates);
            console.log('wheather object ', newWeatherData);
            setWeatherData(newWeatherData);

            // const lat = newWeatherData.geometry.coordinates[1];
            // const lon = newWeatherData.geometry.coordinates[0];
            // setCoordsForForcast({ lat, lon })

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

    const fetchSunTime = async (coordinates) => {
        try {
            const newSunTime = await getSunTime(coordinates, new Date().toLocaleDateString('sv-SE'));
            setSunTime(newSunTime);
            console.log(newSunTime);
        } catch (err) {
            console.error("Error fetching sun time data:", err);
        }
    }

    return (
        <>
            {weatherData ? (
                <>
                    <TodaysForcast weatherData={weatherData.timeSeries[0]} sunTime={sunTime} />
                    <WeeklyWeather weatherData={weatherDataByDay} />
                </>
            ) : (
                <p>Laddar...</p>
            )}
        </>
    );

}


export default ForcastContainer;
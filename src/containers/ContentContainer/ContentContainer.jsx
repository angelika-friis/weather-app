import { useEffect, useState } from 'react';
import { getForcast, getSunTime } from '../../services/ForcastServices';
import Location from '../../components/Location/Location';
import TodaysForcast from '../../components/TodaysForcast/TodaysForcast';
import DayWeatherCard from '../../components/DayWeatherCard/DayWeatherCard';
import styles from './ContentContainer.module.css';

const ConsoleContainer = ({ coordinates, setLocation, location, favorites, setFavorites }) => {

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
        if (coordinates) {
            fetchSunTime(coordinates);
        }
    }, [coordinates])

    const fetchWeatherData = async () => {
        try {
            const newWeatherData = await getForcast(coordinates);
            setWeatherData(newWeatherData);

        } catch (err) {
            console.error("Error fetching weather:", err);
        }
    };

    const processWeatherData = (timeSeries) => {
        const groupedData = {};
        timeSeries.forEach(entry => {
            const utcTime = new Date(entry.validTime);
            const localTime = utcTime.toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });
            const date = localTime.split(' ')[0];
            if (!groupedData[date]) {
                groupedData[date] = [];
            }
            groupedData[date].push(entry);
        });
        const keys = Object.keys(groupedData);
        const lastKey = keys[keys.length - 1];
        delete groupedData[lastKey];

        setWeatherDataByDay(groupedData);
    };

    const fetchSunTime = async (coordinates) => {
        try {
            const newSunTime = await getSunTime(coordinates, new Date().toLocaleDateString('sv-SE'));
            setSunTime(newSunTime);
        } catch (err) {
            console.error("Error fetching sun time:", err);
        }
    }

    return (
        <div className={styles.pageContent}>
            <div className={styles.pageHeader}>
                <Location location={location} favorites={favorites} setFavorites={setFavorites} />
                {weatherData && sunTime && (
                    <TodaysForcast weatherData={weatherData.timeSeries[0]} sunTime={sunTime} />
                )}
            </div>
            {weatherDataByDay &&
                <div className={styles.dayCardsContainer}>
                    {Object.entries(weatherDataByDay).map(([date, dataForTheDay], index) => (
                        <DayWeatherCard
                            key={date}
                            date={date}
                            dataForTheDay={dataForTheDay}
                            index={index}
                            coordinates={coordinates}
                            fetchSunTime={fetchSunTime}
                        />
                    ))}
                </div>}
        </div>
    );

}


export default ConsoleContainer;
import { useEffect, useState } from 'react';
import { getForcast, getSunTime } from '../../services/ForcastServices';
import TodaysForcast from '../../components/TodaysForcast/TodaysForcast';
import DayWeatherCard from '../../components/DayWeatherCard/DayWeatherCard';

const ForcastContainer = ({ coordinates }) => {

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

    const fetchSunTime = async (coordinates) => {
        try {
            const newSunTime = await getSunTime(coordinates, new Date().toLocaleDateString('sv-SE'));
            setSunTime(newSunTime);
            // console.log(newSunTime);
        } catch (err) {
            console.error("Error fetching sun time data:", err);
        }
    }

    return (
        <>
            {weatherData && coordinates && weatherDataByDay && sunTime ? (
                <>
                    <TodaysForcast weatherData={weatherData.timeSeries[0]} sunTime={sunTime} />
                    <div>
                        {Object.entries(weatherDataByDay).map(([date, data], index) => (
                            <DayWeatherCard
                                key={date}
                                date={date}
                                data={data}
                                index={index}
                                coordinates={coordinates}
                            />
                        ))}
                    </div>
                    
                </>
            ) : (
                <p>Laddar...</p>
            )}
        </>
    );

}


export default ForcastContainer;
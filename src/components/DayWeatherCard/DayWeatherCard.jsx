import React, { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { getWeekdayTitle } from "../../utils/getWeekdayTitle.js";
import WeatherEntryItem from "../WeatherEntryItem/WeatherEntryItem.jsx";
import Sunrise from "../Sunrise/Sunrise.jsx";
import WeatherIcon from "../WeatherIcon/WeatherIcon.jsx";
import TemperatureDisplay from "../TemperatureDisplay/TemperatureDisplay.jsx";
import PrecipitationDisplay from "../PrecipitationDisplay/PrecipitationDisplay.jsx";
import WeatherToggleButton from "../WeatherToggleButton/WeatherToggleButton.jsx";
import Popup from "../Popup/Popup.jsx";
import styles from './DayWeatherCard.module.css';

const DayWeatherCard = ({ date, dataForTheDay, index, coordinates }) => {
    const [sunTime, setSunTime] = useState(null);
    const [isListVisible, setIsListVisible] = useState(false);
    const [processedWeatherData, setProcessedWeatherData] = useState({
        weatherIcon: null,
        tempsForTheDay: [],
        totalPrecipitation: 0,
    });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const windowSize = useWindowSize();

    useEffect(() => {
        if (!dataForTheDay || dataForTheDay.length === 0) return;
        const weatherIcons = dataForTheDay.map(hour =>
            hour.parameters?.find(param => param.name === "Wsymb2")?.values[0]
        );
        const iconFrequency = weatherIcons.reduce((acc, icon) => {
            acc[icon] = (acc[icon] || 0) + 1;
            return acc;
        }, {});
        const mostFrequentIcon = Object.keys(iconFrequency).reduce((a, b) =>
            iconFrequency[a] > iconFrequency[b] ? a : b
        );
        const tempsForTheDay = dataForTheDay.map(hour =>
            hour.parameters?.find(param => param.name === "t")?.values[0] || null
        );
        const totalPrecipitation = dataForTheDay.reduce((sum, dataForTheHour) => {
            const pMean = dataForTheHour.parameters.find(dataPoint => dataPoint.name === "pmean").values[0];
            return sum + (pMean);
        }, 0).toFixed(1);
        setProcessedWeatherData({
            weatherIcon: mostFrequentIcon,
            tempsForTheDay,
            totalPrecipitation,
        });
    }, [dataForTheDay]);

    const toggleListVisibility = () => {
        isListVisible ? setIsListVisible(false) : setIsListVisible(true);
    };

    return (
        <div className={styles.dayWeatherCard} onClick={() => setIsPopupOpen(true)}>
            <div className={styles.overview}>
                <div>
                    <h3>{getWeekdayTitle(date, index)}</h3>
                    <h4>{date}</h4>
                </div>
                <div className={styles.overviewWeather}>
                    <TemperatureDisplay temps={processedWeatherData.tempsForTheDay} />
                    {coordinates && date ? (
                        <Sunrise sunTime={sunTime} setSunTime={setSunTime} date={date} coordinates={coordinates} />
                    ) : (
                        <p>Laddar...</p>
                    )}
                    <PrecipitationDisplay precipitation={processedWeatherData.totalPrecipitation} />
                </div>
            </div>
            <WeatherIcon className={styles.cardWeatherSymbol} iconValue={processedWeatherData.weatherIcon} isDay={true} />

            {windowSize.width > 640 ? (
                <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                    <table>
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th className={styles.hour} >Tid</th>
                                <th>Temperatur</th>
                                <th>Vind (Byvind)</th>
                                <th>Nederbörd</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataForTheDay.map((dataForTheHour, index) => (
                                <WeatherEntryItem key={index} entry={dataForTheHour} sunTime={sunTime} table={true} />
                            ))}
                        </tbody>
                    </table>
                </Popup>
            ) : (
                <>
                    <WeatherToggleButton isListVisible={isListVisible} onToggle={toggleListVisibility} />
                    {isListVisible && (
                            dataForTheDay.map((dataForTheHour, index) => (
                                <WeatherEntryItem key={index} entry={dataForTheHour} sunTime={sunTime} table={false}/>
                            ))
                    )}
                </>
            )}
        </div>
    );
};

export default DayWeatherCard;
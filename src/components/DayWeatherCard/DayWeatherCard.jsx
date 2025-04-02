import React, { useState, useEffect } from "react";
import WeatherEntryItem from "../WeatherEntryItem/WeatherEntryItem";
import { getWeekdayTitle } from "../../utils/getWeekdayTitle";
import Sunrise from "../Sunrise/Sunrise.jsx";
import WeatherIcon from "../WeatherIcon";
import TemperatureDisplay from "../TemperatureDisplay";
import PrecipitationDisplay from "../PrecipitationDisplay";
import WeatherToggleButton from "../WeatherToggleButton";
import './DayWeatherCard.css';

const DayWeatherCard = ({ date, dataForTheDay, index, coordinates }) => {
    const [isListVisible, setIsListVisible] = useState(false);
    const [processedWeatherData, setProcessedWeatherData] = useState({
        weatherIcon: null,
        tempsForTheDay: [],
        totalPrecipitation: 0,
    });

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
            const pMedian = dataForTheHour.parameters?.find(dataPoint => dataPoint.name === "pmedian")?.values[0];
            return sum + (pMedian || 0);
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
        <div className="day-weather-card">
            <div className="overview">
                <div>
                    <h3>{getWeekdayTitle(date, index)}</h3>
                    <h4>{date}</h4>
                </div>
                <div className="overview-weather">
                    <TemperatureDisplay temps={processedWeatherData.tempsForTheDay} />
                    {coordinates && date ? (
                        <Sunrise date={date} coordinates={coordinates} />
                    ) : (
                        <p>Laddar...</p>
                    )}
                    <PrecipitationDisplay totalPrecipitation={processedWeatherData.totalPrecipitation} />
                </div>
            </div>
            <WeatherIcon iconValue={processedWeatherData.weatherIcon} />
            <br />
            <WeatherToggleButton isListVisible={isListVisible} onToggle={toggleListVisibility} />
            {isListVisible && (
                <ul className="entry-items">
                    {dataForTheDay.map((dataForTheHour, index) => (
                        <WeatherEntryItem key={index} entry={dataForTheHour} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DayWeatherCard;
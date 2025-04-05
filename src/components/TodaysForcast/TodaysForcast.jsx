import { getWeatherIcon } from "../../utils/getWeatherIcon";
import { isItDayTime } from "../../utils/isItDayTime";
import './TodaysForcast.css';
import Wind from "../Wind/Wind";
import PrecipitationDisplay from "../PrecipitationDisplay/PrecipitationDisplay.jsx";

const TodaysForcast = ({ weatherData, sunTime }) => {
    const weatherIconValue = weatherData.parameters.find(dataPoint => dataPoint.name === "Wsymb2").values[0]
    const weatherIcon = getWeatherIcon(weatherIconValue, isItDayTime(new Date(), sunTime))

    return (
        <div id="todays-forcast">
            <img className="todays-icon" src={weatherIcon} alt='weather icon' />
            <div id="weather-info">
                <p id="header">Just nu</p>
                <p id="temp">{Math.round(weatherData.parameters.find(dataPoint => dataPoint.name === "t").values[0])}ºC</p>
                <Wind
                    ws={weatherData.parameters.find(dataPoint => dataPoint.name === "ws").values[0]}
                    gust={weatherData.parameters.find(dataPoint => dataPoint.name === "gust").values[0]}
                    wd={weatherData.parameters.find(dataPoint => dataPoint.name === "wd").values[0]} />
                <PrecipitationDisplay precipitation={weatherData.parameters.find(dataPoint => dataPoint.name === "pmean").values[0]}/>
            </div>
        </div>
    )
}

export default TodaysForcast;
import { FaDroplet, FaDropletSlash } from "react-icons/fa6";
import { getCompassDirection } from "../../utils/getCompassDirection";
import { getWeatherIcon } from "../../utils/getWeatherIcon";
import { isItDayTime } from "../../utils/isItDayTime";
import './TodaysForcast.css';

const TodaysForcast = ({ weatherData, sunTime }) => {
    const weatherIconValue = weatherData.parameters.find(dataPoint => dataPoint.name === "Wsymb2").values[0]
    const weatherIcon = getWeatherIcon(weatherIconValue, isItDayTime(new Date(), sunTime))

    return (
        <div id="todays-forcast">
            {sunTime && <img src={weatherIcon} alt='weather icon' />}
            <div id="weather-info">
                <p id="hour">Kl. {new Intl.DateTimeFormat('sv-SE', {
                    hour: 'numeric'
                }).format(new Date())}</p>
                <p id="temp">{Math.round(weatherData.parameters.find(dataPoint => dataPoint.name === "t").values[0])}ºC</p>
                <p id="wind">{`Vind: 
                ${weatherData.parameters.find(dataPoint => dataPoint.name === "ws").values[0]} 
                (${weatherData.parameters.find(dataPoint => dataPoint.name === "gust").values[0]}) m/s, 
                riktning ${getCompassDirection(weatherData.parameters.find(dataPoint => dataPoint.name === "wd").values[0])}`}</p>
                <p id="percipation">
                    {weatherData.parameters.find(dataPoint => dataPoint.name === "pmedian").values[0] !== 0
                            ? (
                                <>
                                    <FaDroplet className="icon" />
                                    {weatherData.parameters.find(dataPoint => dataPoint.name === "pmedian").values[0]} mm/h
                                </>
                            )
                            : <FaDropletSlash className="icon" />}
                </p>
            </div>
        </div>
    )
}

export default TodaysForcast;
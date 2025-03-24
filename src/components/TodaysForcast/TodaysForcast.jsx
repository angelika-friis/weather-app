import { getCompassDirection } from "../../utils/getCompassDirection";
import { getWeatherIcon } from "../../utils/getWeatherIcon";
import { isItDayTime } from "../../utils/isItDayTime";

const TodaysForcast = ({ weatherData, sunTime }) => {
    if (!sunTime) return null;

    const weatherIconValue = weatherData.parameters.find(dataPoint => dataPoint.name === "Wsymb2").values[0]
    const weatherIcon = getWeatherIcon(weatherIconValue, isItDayTime(new Date(), sunTime))

    return (
        <div className="">
            <h3>Just nu</h3>
            <p>Temperatur: {weatherData.parameters.find(dataPoint => dataPoint.name === "t").values[0]}ºC</p>
            <p>{`Vind: 
                ${weatherData.parameters.find(dataPoint => dataPoint.name === "ws").values[0]} 
                (${weatherData.parameters.find(dataPoint => dataPoint.name === "gust").values[0]}) m/s, 
                riktning ${getCompassDirection(weatherData.parameters.find(dataPoint => dataPoint.name === "wd").values[0])}`}</p>
            <p>Nederbörd: {weatherData.parameters.find(dataPoint => dataPoint.name === "pmedian").values[0]} mm/h</p>
            <img src={weatherIcon} alt='weather icon' />
        </div>
    )
}

export default TodaysForcast;
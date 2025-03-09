import { getCompassDirection } from "../../utils/getCompassDirection";
import { getWeatherIcon } from "../../utils/getWeatherIcon";
import { isItDayTime } from "../../utils/isItDay";
import overcast from '../../assets/overcast.svg';

const TodaysForcast = ({ weatherData, sunTime }) => {
    if (!sunTime) return null;

    const weatherIconValue = weatherData.parameters[18].values[0]
    const weatherIcon = weatherIconValue === 6
        ? overcast
        : getWeatherIcon(weatherIconValue, isItDayTime(new Date(), sunTime))

    return (
        <div className="">
            <p>Idag</p>
            <p>{weatherData.validTime.slice(0, 10)}</p>
            <p>Temperatur: {weatherData.parameters[10].values[0]}ºC</p>
            <p>{`Vind: 
                ${weatherData.parameters[14].values[0]} 
                (${weatherData.parameters[17].values[0]}) m/s, 
                riktning ${getCompassDirection(weatherData.parameters[13].values[0])}`}</p>
            <p>Nederbörd: {weatherData.parameters[5].values[0]} mm/h</p>
            <img src={weatherIcon} alt='weather icon' />
        </div>
    )
}

export default TodaysForcast;
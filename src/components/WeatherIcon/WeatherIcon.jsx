import { getWeatherIcon } from "../../utils/getWeatherIcon";
import styles from './weatherIcon.module.css';
import { isItDayTime } from "../../utils/isItDayTime";

const WeatherIcon = ({ className, iconValue, sunTime, date }) => {
    let isDay = true;
    if (sunTime && date) {isDay = isItDayTime(new Date(date), sunTime)};
    const weatherIcon = getWeatherIcon(iconValue, isDay);

    return <img className={className} src={weatherIcon} alt="weather icon" />;
};

export default WeatherIcon;

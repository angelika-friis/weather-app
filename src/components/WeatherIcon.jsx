import { getWeatherIcon } from "../utils/getWeatherIcon";

const WeatherIcon = ({ iconValue }) => {
    const weatherIcon = getWeatherIcon(iconValue, true);

    return <img className="weather-symbol" src={weatherIcon} alt="weather icon" />;
};

export default WeatherIcon;

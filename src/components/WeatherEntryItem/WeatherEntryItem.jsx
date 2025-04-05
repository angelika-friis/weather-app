import { getCompassDirection } from "../../utils/getCompassDirection";
import PrecipitationDisplay from "../PrecipitationDisplay/PrecipitationDisplay";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import Wind from "../Wind/Wind";
import './WeatherEntryItem.css';

const WeatherEntryItem = ({ entry, sunTime, table }) => {
    const iconValue = entry.parameters.find(dataPoint => dataPoint.name === "Wsymb2").values[0];
    const temperature = Math.round(entry.parameters.find(dataPoint => dataPoint.name === "t").values[0]);
    const windSpeed = entry.parameters.find(dataPoint => dataPoint.name === "ws").values[0];
    const gust = entry.parameters.find(dataPoint => dataPoint.name === "gust").values[0];
    const windDirection = entry.parameters.find(dataPoint => dataPoint.name === "wd").values[0];
    const precipitation = entry.parameters.find(dataPoint => dataPoint.name === "pmean").values[0];
    const time = (new Date(entry.validTime)).toLocaleTimeString([], { hour: '2-digit' });

    if (table && entry && sunTime) {
        return (
            <tr>
                <td><WeatherIcon iconValue={iconValue} sunTime={sunTime} date={entry.validTime} /></td>
                <td className="hour">Kl. {time}</td>
                <td>{temperature}°</td>
                <td><Wind ws={windSpeed} gust={gust} wd={windDirection} /></td>
                <td><PrecipitationDisplay precipitation={precipitation} /></td>
            </tr>
        );
    } if (!table && entry && sunTime) {
        return (
            <div className="entry-item">
                <WeatherIcon className='hourly-weather-icon' iconValue={iconValue} sunTime={sunTime} date={entry.validTime} />
                <p>Kl. {time}</p>
                <div>
                    <p>{temperature}°</p>
                    <Wind ws={windSpeed} gust={gust} wd={windDirection} />
                    <PrecipitationDisplay precipitation={precipitation} />
                </div>
            </div>
        );
    }
};

export default WeatherEntryItem;
import { getCompassDirection } from "../../utils/getCompassDirection";
import PrecipitationDisplay from "../PrecipitationDisplay/PrecipitationDisplay";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import Wind from "../Wind/Wind";
import './WeatherEntryItem.css';

const WeatherEntryItem = ({ entry, sunTime }) => {
    return (<tr>
        <td>
            <WeatherIcon
                iconValue={entry.parameters.find(dataPoint => dataPoint.name === "Wsymb2").values[0]}
                sunTime={sunTime}
                date={entry.validTime} />
        </td>
        <td className="hour">Kl. {(new Date(entry.validTime)).toLocaleTimeString([], { hour: '2-digit' })}</td>
        <td>{Math.round(entry.parameters.find(dataPoint => dataPoint.name === "t").values[0])}°</td>
        <td><Wind
            ws={entry.parameters.find(dataPoint => dataPoint.name === "ws").values[0]}
            gust={entry.parameters.find(dataPoint => dataPoint.name === "gust").values[0]}
            wd={entry.parameters.find(dataPoint => dataPoint.name === "wd").values[0]}
        /></td>
        <td><PrecipitationDisplay precipitation={entry.parameters.find(dataPoint => dataPoint.name === "pmean").values[0]} /></td>

    </tr>)
};

export default WeatherEntryItem;
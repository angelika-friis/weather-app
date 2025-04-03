import { getCompassDirection } from "../../utils/getCompassDirection";
import './WeatherEntryItem.css';

const WeatherEntryItem = ({ entry }) => {
    return (<li className="entry-item">
        <p className="hour">Kl. {(new Date(entry.validTime)).toLocaleTimeString([], { hour: '2-digit' })}</p>
        <div>
            <p>{Math.round(entry.parameters.find(dataPoint => dataPoint.name === "t").values[0])}ºC</p>
            <p>
                {`${entry.parameters.find(dataPoint => dataPoint.name === "ws").values[0]}
             (${entry.parameters.find(dataPoint => dataPoint.name === "gust").values[0]}) m/s, 
            ${getCompassDirection(entry.parameters.find(dataPoint => dataPoint.name === "wd").values[0])}`}
            </p>
            <p>{entry.parameters.find(dataPoint => dataPoint.name === "pmedian").values[0]} mm/h</p>
        </div>
    </li>)
};

export default WeatherEntryItem;
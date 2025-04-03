import { getCompassDirection } from "../../utils/getCompassDirection";
import PrecipitationDisplay from "../PrecipitationDisplay/PrecipitationDisplay";
import Wind from "../Wind/Wind";
import './WeatherEntryItem.css';

const WeatherEntryItem = ({ entry }) => {
    return (<li className="entry-item">
        <p className="hour">Kl. {(new Date(entry.validTime)).toLocaleTimeString([], { hour: '2-digit' })}</p>
        <div>
            <p>{Math.round(entry.parameters.find(dataPoint => dataPoint.name === "t").values[0])}ºC</p>
            <Wind
                ws={entry.parameters.find(dataPoint => dataPoint.name === "ws").values[0]}
                gust={entry.parameters.find(dataPoint => dataPoint.name === "gust").values[0]}
                wd={entry.parameters.find(dataPoint => dataPoint.name === "wd").values[0]}
            />
            <PrecipitationDisplay precipitation={entry.parameters.find(dataPoint => dataPoint.name === "pmedian").values[0]} />
        </div>
    </li>)
};

export default WeatherEntryItem;
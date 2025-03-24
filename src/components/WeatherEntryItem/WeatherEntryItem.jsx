import { getCompassDirection } from "../../utils/getCompassDirection";

const WeatherEntryItem = ({ entry }) => (
    <li>
        <p>{new Date(entry.validTime).toLocaleTimeString()}</p>
        <p>{entry.parameters[10].values[0]}ºC</p>
        <p>
            {`${entry.parameters.find(dataPoint => dataPoint.name === "ws").values[0]}
             (${entry.parameters.find(dataPoint => dataPoint.name === "gust").values[0]}) m/s, 
            ${getCompassDirection(entry.parameters.find(dataPoint => dataPoint.name === "wd").values[0])}`}
        </p>
        <p>{entry.parameters.find(dataPoint => dataPoint.name === "pmean").values[0]} mm/h</p>
    </li>
);

export default WeatherEntryItem;
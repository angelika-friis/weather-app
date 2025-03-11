import { getCompassDirection } from "../../utils/getCompassDirection";

const WeatherEntryItem = ({ entry }) => (
    <li>
        <p>{new Date(entry.validTime).toLocaleTimeString()}</p>
        <p>{entry.parameters[10].values[0]}ºC</p>
        <p>
            {`${entry.parameters[14].values[0]} (${entry.parameters[17].values[0]}) m/s, 
            ${getCompassDirection(entry.parameters[13].values[0])}`}
        </p>
        <p>{entry.parameters[5].values[0]} mm/h</p>
    </li>
);

export default WeatherEntryItem;
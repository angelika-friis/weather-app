import WeatherEntryItem from "../WeatherEntryItem/WeatherEntryItem";
import { getWeekdayTitle } from "../../utils/getWeekdayTitle";
import Sunrise from "../Sunrise";

const DayWeatherCard = ({ date, data, index, coordinates }) => {
    const calculateTotalPrecipitation = (data) => {
        return data.reduce((sum, entry) => sum + entry.parameters[5].values[0], 0).toFixed(1);
    };

    return (
        <div>
            <h3>{getWeekdayTitle(date, index)}</h3>
            <h4>{date}</h4>
            <strong>Total nederbörd: {calculateTotalPrecipitation(data)} mm</strong>

            {coordinates && date ? (
                <Sunrise date={date} coordinates={coordinates} />
            ) : (
                <p>Laddar...</p>
            )}

            <ul>
                {data.map((entry, entryIndex) => (
                    <WeatherEntryItem key={entryIndex} entry={entry} />
                ))}
            </ul>
        </div>
    )
};

export default DayWeatherCard;
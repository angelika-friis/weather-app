import WeatherEntryItem from "../WeatherEntryItem/WeatherEntryItem";
import { getWeekdayTitle } from "../../utils/getWeekdayTitle";
import Sunrise from "../Sunrise";

const DayWeatherCard = ({ date, dataForTheDay, index, coordinates }) => {
    const calculateTotalPrecipitation = (dataForTheDay) => {
        return dataForTheDay
            .reduce((sum, dataForTheHour) =>
                sum + (dataForTheHour.parameters.find(dataPoint => dataPoint.name === "pmedian").values[0]), 0)
            .toFixed(1)
    };

    return (
        <div>
            <h3>{getWeekdayTitle(date, index)}</h3>
            <h4>{date}</h4>
            <strong>Total nederbörd: {calculateTotalPrecipitation(dataForTheDay)} mm</strong>

            {coordinates && date ? (
                <Sunrise date={date} coordinates={coordinates} />
            ) : (
                <p>Laddar...</p>
            )}

            <ul>
                {dataForTheDay.map((dataForTheHour, index) => (
                    <WeatherEntryItem key={index} entry={dataForTheHour} />
                ))}
            </ul>
        </div>
    )
};

export default DayWeatherCard;
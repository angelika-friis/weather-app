const WeeklyWeather = ({ weatherData }) => {

    if (!weatherData) return <p>Laddar veckans väder...</p>;

    return (
        <div className="">
            {Object.entries(weatherData).map(([date, data]) => (
                <div key={date}>
                    <h3>{date}</h3>
                    <ul>
                        {data.map((entry, index) => (
                            <li key={index}>
                                <p>Tid: {new Date(entry.validTime).toLocaleTimeString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default WeeklyWeather;
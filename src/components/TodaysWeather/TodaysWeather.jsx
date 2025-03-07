const TodaysWeather = ({ weatherData }) => {
    
    return (
        <div className="">
            <p>Idag</p>
            <p>{weatherData.timeSeries[0].validTime.slice(0, 10)}</p>
            <p>Temperaturen ute är just nu {weatherData.timeSeries[0].parameters[9].values[0]}ºC</p>
        </div>
    )
}

export default TodaysWeather;
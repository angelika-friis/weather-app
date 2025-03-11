import { useEffect, useState } from "react"
import { getSunTime } from "../services/ForcastServices"

const Sunrise = ({ date, coordinates }) => {
    const [sunTime, setSunTime] = useState(null);

    useEffect(() => {
        if (coordinates) {
            fetchSunTime(coordinates);
        }
    }, [coordinates])

    const fetchSunTime = async (coordinates) => {
        try {
            const formattedDate = new Date(date).toLocaleDateString("sv-SE");
            const newSunTime = await getSunTime(coordinates, formattedDate);
            setSunTime(newSunTime);
        } catch (err) {
            console.error("Error fetching sun time data:", err);
        }
    }

    return (<>
        {sunTime ? (
                <>
                    {new Date(sunTime.sunrise).toLocaleTimeString()} /{" "}
                    {new Date(sunTime.sunset).toLocaleTimeString()}
                </>
            ) : (
                <>Laddar soluppgång och solnedgång...</>
            )}
    </>)
}

export default Sunrise;
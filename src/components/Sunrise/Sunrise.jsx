import { useEffect, useState } from "react"
import { getSunTime } from "../../services/ForcastServices.js"
import { FiSunrise, FiSunset } from "react-icons/fi";

import './Sunrise.css';

const Sunrise = ({ sunTime, setSunTime, date, coordinates }) => {
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
            <div id="sunrise">
                <div>
                    <FiSunrise className="sunrise-icon icon" />
                    <p>{new Intl.DateTimeFormat('sv-SE', {
                        hour: 'numeric',
                        minute: 'numeric',
                    }).format(new Date(sunTime.sunrise))}</p>
                    <FiSunset className="sunrise-icon icon" />
                    <p>{new Intl.DateTimeFormat('sv-SE', {
                        hour: 'numeric',
                        minute: 'numeric',
                    }).format(new Date(sunTime.sunset))}</p>
                </div>
            </div>
        ) : (
            <p>Laddar soluppgång och solnedgång...</p>
        )}
    </>)
}

export default Sunrise;
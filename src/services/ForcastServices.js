export const getForcast = async (coordinates) => {
    try {
        const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coordinates.lon}/lat/${coordinates.lat}/data.json`;
        // console.log(url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching forcast:", error);
        return null;
    }
};

export const getSunTime = async (coordinates, date) => {
    try {
        // Validate coordinates parameter
        if (!coordinates || typeof coordinates !== 'object') {
            throw new Error('Invalid coordinates: Expected an object with lat and lon properties. Right now coordinates is: ' + coordinates);
        }

        if (typeof coordinates.lat !== 'number' || typeof coordinates.lon !== 'number') {
            throw new Error('Invalid coordinates: lat and lon must be numbers');
        }

        const url = `https://api.met.no/weatherapi/sunrise/3.0/sun?lat=${coordinates.lat}&lon=${coordinates.lon}&date=${date}`;
        // console.log(url);

        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        response = await response.json();

        if (!response.properties || !response.properties.sunrise || !response.properties.sunset) {
            throw new Error('Invalid API response: Missing required data');
        }

        const sunTime = {
            sunrise: new Date((response.properties.sunrise.time)),
            sunset: new Date((response.properties.sunset.time))
        };

        // console.log(sunTime);
        return sunTime;

    } catch (error) {
        console.error("Error fetching sunrise and sunset:", error);
        return null;
    }
};
const GetWeather = async (lon, lat) => {
    try {
        console.log(lon, lat);
        const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
        console.log(url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
};

export default GetWeather;
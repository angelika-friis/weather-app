import axios from 'axios';

export const getPlaces = async (searchVal) => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const url = `https://places.googleapis.com/v1/places:autocomplete?key=${apiKey}`;

    try {
        const response = await axios.post(url, 
            {
                input: searchVal,
                languageCode: "sv",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-FieldMask": "*"
                }
            }
        );

        console.log("Places API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching places:", error.response?.data || error.message);
        return null;
    }
};

export const getPlaceNameFromCoords = async (coordinates) => {
    console.log("Fetching place name for coordinates:", coordinates);
    
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lon}&key=${apiKey}`;

    console.log(url)

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const results = data.results;

        let place = { locality: null, sublocality: null, region: null };

        for (let result of results) {
            for (let component of result.address_components) {
                if (component.types.includes("locality")) {
                    place.locality = component.long_name;
                } else if (component.types.includes("sublocality")) {
                    place.sublocality = component.long_name;
                } else if (component.types.includes("administrative_area_level_2")) {
                    place.region = component.long_name;
                }
            }
            if (place.locality && place.region || place.sublocality && place.region) {
                break;
            }

        }
        console.log("Place name:", place);
        return place;
    } catch (error) {
        return console.error(error);
    }
};
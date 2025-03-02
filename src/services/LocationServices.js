import axios from 'axios';

const GetPlaces = async (searchVal) => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const url = `https://places.googleapis.com/v1/places:autocomplete?key=${apiKey}`;

    try {
        const response = await axios.post(url, 
            {
                input: searchVal,
                languageCode: "sv"
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

export default GetPlaces;

const BASE_URL = 'https://nominatim.openstreetmap.org';

const headers = {
    'User-Agent': 'ReactAssignmentWeatherApp/1.0',
    'Accept-Language': 'sv,en'
};

export const searchLocations = async (query) => {

    try {
        if (!query || query.trim().length < 2) {
            return [];
        }

        const cleanQuery = query.trim();

        const params = new URLSearchParams({
            q: cleanQuery,
            format: 'json',
            addressdetails: 1,
            countrycodes: 'se',
            limit: 40,
            featureType: 'settlement'
        });

        const response = await fetch(`${BASE_URL}/search?${params.toString()}`, {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch locations: ${response.status}`);
        }

        const data = await response.json();

        return data
            .filter(item => {
                const placeName = item.address.city ||
                    item.address.town ||
                    item.address.village ||
                    item.address.hamlet ||
                    item.name || '';

                const exactMatch = placeName.toLowerCase() === cleanQuery.toLowerCase();
                
                return exactMatch;
            })
            .map(item => {
                const name = item.address.city ||
                    item.address.town ||
                    item.address.village ||
                    item.address.hamlet ||
                    item.name;
                const county = item.address.county || '';
                const municipality = item.address.municipality || '';

                return {
                    id: item.place_id,
                    fullName: item.display_name,
                    name: name,
                    coordinates: {
                        lat: parseFloat(item.lat).toFixed(6),
                        lon: parseFloat(item.lon).toFixed(6)
                    },
                    county: county,
                    municipality: municipality,
                };
            });
    } catch (error) {
        console.error('Error searching locations:', error);
        throw error;
    }
};

export const reverseGeocode = async (coordinates) => {
    try {
        const lat = coordinates.lat;
        const lon = coordinates.lon;

        const params = new URLSearchParams({
            lat,
            lon,
            format: 'json',
            addressdetails: 1,
        });

        const response = await fetch(`${BASE_URL}/reverse?${params.toString()}`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error(`Failed to reverse geocode: ${response.status}`);
        }

        const item = await response.json();

        return {
            id: item.place_id,
            fullName: item.display_name,
            name: item.address.city ||
                item.address.town ||
                item.address.village ||
                item.address.hamlet ||
                item.name,
            coordinates: {
                lat: parseFloat(item.lat).toFixed(6),
                lon: parseFloat(item.lon).toFixed(6)
            },
            county: item.address.county || '',
            municipality: item.address.municipality || ''
        };
    } catch (error) {
        console.error('Error searching locations:', error);
        throw error;
    }
};
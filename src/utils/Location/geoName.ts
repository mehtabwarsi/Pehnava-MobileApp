export const getAddressFromCoords = async (lat: number, lon: number) => {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
            {
                headers: {
                    'User-Agent': 'PehnavaMobileApp/1.0',
                },
            }
        );

        if (!res.ok) throw new Error('Network response was not ok');

        const data = await res.json();
        const address = data.address || {};

        return (
            address.suburb ||
            address.neighbourhood ||
            address.city ||
            address.town ||
            address.village ||
            address.hamlet ||
            'Your Location'
        );
    } catch (error) {
        console.error('Geocoding error:', error);
        return 'Location Unavailable';
    }
};

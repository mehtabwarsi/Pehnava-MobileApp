import Geolocation from "@react-native-community/geolocation";

export const getCurrentLocation = () =>
    new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
        // Try high accuracy first
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            () => {
                // Fallback to low accuracy if high accuracy fails
                Geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        resolve({ latitude, longitude });
                    },
                    error => reject(error),
                    { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
                );
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
        );
    });

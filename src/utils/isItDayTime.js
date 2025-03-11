export const isItDayTime = (date, sunTime) => {
    if (!sunTime || !sunTime.sunrise || !sunTime.sunset) return false;

    return date >= sunTime.sunrise && date < sunTime.sunset;
};

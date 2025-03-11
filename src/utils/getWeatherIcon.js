export const getWeatherIcon = (value, isDay) => {
    const suffix = isDay ? "_day" : "_night";
    
    const weatherIcons = {
        1: `clearsky${suffix}.svg`,
        2: `fair${suffix}.svg`,
        3: `partlycloudy${suffix}.svg`,
        4: `partlycloudy${suffix}.svg`,
        5: "cloudy.svg",
        6: "cloudy.svg",
        7: "fog.svg",
        8: `lightrainshowers${suffix}.svg`,
        9: "rain.svg",
        10: "heavyrain.svg",
        11: "heavyrainandthunder.svg",
        12: "lightsleet.svg",
        13: "sleet.svg",
        14: "heavysleet.svg",
        15: "lightsnow.svg",
        16: "snow.svg",
        17: "heavysnow.svg",
        18: `lightrainshowers${suffix}.svg`,
        19: `lightrainshowers${suffix}.svg`,
        20: "heavyrain.svg",
        21: "lightrainandthunder.svg",
        22: "lightsleet.svg",
        23: "sleet.svg",
        24: "heavysleet.svg",
        25: "lightsnow.svg",
        26: "snow.svg",
        27: "heavysnow.svg"
    };

    const iconSrc = 'https://raw.githubusercontent.com/metno/weathericons/refs/heads/main/weather/svg/' + weatherIcons[value];

    // console.log('väder icon: ' + iconSrc)
    return iconSrc;
};

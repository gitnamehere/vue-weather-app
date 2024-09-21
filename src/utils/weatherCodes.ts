export interface WeatherCode {
    code: number;
    isDay?: number;
}

export interface WeatherConditions {
    description: string;
    icon?: string;
}

export const parseWeatherCode = ({ code, isDay = 1 }: WeatherCode): WeatherConditions => {
    switch (code) {
        case 0:
            return isDay
                ? { description: "Sunny", icon: "wi-day-sunny" }
                : { description: "Clear", icon: "wi-night-clear" };
        case 1:
            return isDay
                ? { description: "Mostly Sunny", icon: "wi-day-cloudy-high" }
                : { description: "Mostly Clear", icon: "wi-night-alt-cloudy-high" };
        case 2:
            return {
                description: "Partly Cloudy",
                icon: isDay ? "wi-night-partly-cloudy" : "wi-night-alt-partly-cloudy"
            };
        case 3:
            return { description: "Cloudy", icon: "wi-cloudy" };
        case 45:
            return { description: "Fog", icon: "wi-fog" };
        case 48:
            return { description: "Freezing Fog", icon: "wi-fog" };
        case 51:
            return { description: "Light Drizzle", icon: "wi-sprinkle" };
        case 53:
            return { description: "Drizzle", icon: "wi-sprinkle" };
        case 55:
            return { description: "Heavy Drizzle", icon: "wi-sprinkle" };
        case 56:
            return { description: "Light Freezing Drizzle", icon: "wi-rain-mix" };
        case 57:
            return { description: "Freezing Drizzle", icon: "wi-rain-mix" };
        case 61:
            return { description: "Light Rain", icon: "wi-raindrops" };
        case 63:
            return { description: "Rain", icon: "wi-rain" };
        case 65:
            return { description: "Heavy Rain", icon: "wi-rain-wind" };
        case 66:
            return { description: "Light Freezing Rain", icon: "wi-rain-mix" };
        case 67:
            return { description: "Freezing Rain", icon: "wi-rain-mix" };
        case 71:
            return { description: "Light Snow", icon: "wi-snow" };
        case 73:
            return { description: "Snow", icon: "wi-snow" };
        case 75:
            return { description: "Heavy Snow", icon: "wi-snow-wind" };
        case 77:
            return { description: "Snow Grains", icon: "wi-snowflake-cold" };
        case 80:
            return { description: "Light Showers", icon: "wi-showers" };
        case 81:
            return { description: "Showers", icon: "wi-showers" };
        case 82:
            return { description: "Heavy Showers", icon: "wi-showers" };
        case 85:
            return { description: "Light Snow Showers", icon: "wi-snow" };
        case 86:
            return { description: "Snow Showers", icon: "wi-snow" };
        case 95:
            return { description: "Thunderstorms", icon: "wi-thunderstorm" };
        case 96:
            return { description: "Thunderstorms with Light Hail", icon: "wi-storm-showers" };
        case 99:
            return { description: "Thunderstorms with Hail", icon: "wi-storm-showers" };
        default:
            return { description: "Unknown Weather" };
    }
};

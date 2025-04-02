import axios from "axios";
import { API_URL, GEOCODING_API_URL, TemperatureUnits } from "@/utils/constants";

export const getLocations = async (locationName: string, count: number): Promise<any[]> => {
  let locations: Object[] = [];

  await axios
    .get(`${GEOCODING_API_URL}search?name=${locationName}&count=${count}&language=en&format=json`)
    .then((res) => {
      if (res.data.results) {
        return locations = res.data.results;
      }
      return locations = [];
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return locations;
}

export const fetchWeatherData = async (latitude: number, longitude: number, temperatureUnit: TemperatureUnits) => {
  const requestUrl =
    `${API_URL}forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,surface_pressure,is_day,weather_code,wind_speed_10m,wind_direction_10m` +
    `&hourly=temperature_2m,weather_code,is_day` +
    `&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
    `&temperature_unit=${temperatureUnit}` +
    `&wind_speed_unit=mph` +
    `&precipitation_unit=inch` +
    `&timezone=auto` +
    `&forecast_days=14` +
    `&forecast_hours=24`;
  const aqiUrl =
    `https://air-quality-api.open-meteo.com/v1/air-quality` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=us_aqi`;

  let weather: object = {};
  let aqi: number | null = null;

  await axios
    .get(requestUrl)
    .then(res => weather = res.data)
    .catch(err => {
      console.log(err)
      throw err
    });
  await axios
    .get(aqiUrl)
    .then(res => aqi = res.data.current.us_aqi)
    .catch(err => {
      console.log(err)
    });
  
  if (aqi) Object.assign(weather, { aqi });

  return weather;
}

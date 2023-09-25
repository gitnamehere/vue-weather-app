import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import parseWeatherCode from '@/utils/weatherCodes';

const API_URL = "https://api.open-meteo.com/v1/";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/";

export const useWeatherStore = defineStore('weather', () => {

  const location = ref("");
  const longitude = ref();
  const latitude = ref();
  const temperature_unit = ref("fahrenheit");
  const geocoding = ref(); // This will be a JSON object based on the API's geocoding response, or error
  const weather = ref(); // This will be a JSON object based on the API's current_weather response, or error
  const weatherConditions = ref(); // This will be a JSON object for the current weather conditions, using parseWeatherCode()

  const locations = ref();

  const setLocation = (locationSearch: string) => {
    location.value = locationSearch;
  };

  const getLocations = async (locationSearch: string) => {
    axios
      .get(`${GEOCODING_API_URL}search?name=${locationSearch}&count=10&language=en&format=json`)
      .then((res) => {
        locations.value = res.data.results;
        console.log(res.data.results);
      })
      .catch((err) => {
        console.log(err);
        locations.value = null;
      });
  };

  const getWeather = async () => {
    axios
      .get(`${GEOCODING_API_URL}search?name=${location.value}&count=1&language=en&format=json`)
      .then((res) => {
        longitude.value = res.data.results[0].longitude;
        latitude.value = res.data.results[0].latitude;
        geocoding.value = res.data.results[0];
        getWeatherData();
      })
      .catch((err) => {
        console.log(err);
        geocoding.value = null;
        weather.value = null;
      })
    };

  const getWeatherByCoords = (location: any) => {
    longitude.value = location.longitude;
    latitude.value = location.latitude;
    geocoding.value = location;
    getWeatherData();
  };
    
  const getWeatherData = () => {
    const requestUrl = `${API_URL}forecast` + 
      `?latitude=${latitude.value}` +
      `&longitude=${longitude.value}` +
      `&current_weather=true` +
      `&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
      `&temperature_unit=${temperature_unit.value}` +
      `&windspeed_unit=mph` + 
      `&precipitation_unit=inch` +
      `&timezone=auto` +
      `&forecast_days=10`;

    axios
      .get(requestUrl)
      .then((res) => {
        console.log(res.data);
        weather.value = res.data;
        weatherConditions.value = parseWeatherCode({ code: weather.value.current_weather.weathercode, isDay: weather.value.current_weather.is_day });
      })
      .catch((err) => {
        console.log(err);
        geocoding.value = null;
        weather.value = null;
      });
  };

  return { location, locations, longitude, latitude, temperature_unit, weather, geocoding, weatherConditions, getWeather, getWeatherByCoords, getLocations, setLocation }
})

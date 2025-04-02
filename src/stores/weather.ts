import { ref } from "vue";
import { defineStore } from "pinia";

import * as openMeteoService from "@/services/openMeteoWeatherService";
import { parseWeatherCode, type WeatherConditions } from "@/utils/weatherCodes";
import { TemperatureUnits } from "@/utils/constants";

// create weather store with setup syntax
export const useWeatherStore = defineStore("weather", () => {
  // state
  const longitude = ref();
  const latitude = ref();
  const temperatureUnit = ref<TemperatureUnits>(TemperatureUnits.FAHRENHEIT);
  const geocoding = ref();
  const weather = ref();
  const weatherConditions = ref<WeatherConditions>(); // This will be a JSON object for the current weather conditions, using parseWeatherCode()
  const locations = ref();
  const error = ref(false);

  const toggleTemperatureUnit = () => {
    temperatureUnit.value =
      temperatureUnit.value === TemperatureUnits.FAHRENHEIT
        ? TemperatureUnits.CELSIUS
        : TemperatureUnits.FAHRENHEIT;

    if (weather.value) fetchWeatherData(latitude.value, longitude.value);
  };

  const getLocations = async (locationSearchString: string) => {
    try {
      locations.value = await openMeteoService.getLocations(locationSearchString, 10);
    } catch (err) {
      console.log(err);
    }
  };

  const getWeatherByName = async (locationSearchString: string) => {
    try {
      const location = await openMeteoService.getLocations(locationSearchString, 1);

      if (location.length) {
        longitude.value = location[0].longitude;
        latitude.value = location[0].latitude;
        geocoding.value = location[0];
        fetchWeatherData(latitude.value, longitude.value);
      } else {
        geocoding.value = {};
        weather.value = {};
      }
    } catch (err) {
      console.log(err);
      error.value = true;
    }
  };

  const getWeatherFromGeocoding = (location: any) => {
    error.value = false;
    longitude.value = location.longitude;
    latitude.value = location.latitude;
    geocoding.value = location;
    fetchWeatherData(latitude.value, longitude.value);
  };

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      weather.value = await openMeteoService.fetchWeatherData(
        latitude,
        longitude,
        temperatureUnit.value
      );
      weatherConditions.value = parseWeatherCode({
        code: weather.value.current.weather_code,
        isDay: weather.value.current.is_day
      });
    } catch (err) {
      console.log(err);
      error.value = true;
    }
  };

  return {
    location,
    locations,
    longitude,
    latitude,
    temperatureUnit,
    weather,
    geocoding,
    weatherConditions,
    toggleTemperatureUnit,
    getWeatherByName,
    getWeatherFromGeocoding,
    getLocations,
    fetchWeatherData,
    error
  };
});

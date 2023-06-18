import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = "https://api.open-meteo.com/v1/";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/";

export const useWeatherStore = defineStore('weather', () => {

  const location = ref("");
  const longitude = ref();
  const latitude = ref();
  const temperature_unit = ref("fahrenheit");
  const geocoding = ref(); // This will be a JSON object based on the API's geocoding response, or error
  const weather = ref(); // This will be a JSON object based on the API's current_weather response, or error

  const setLocation = (locationSearch: string) => {
    location.value = locationSearch;
  };

  const getWeather = async () => {
    axios
      .get(`${GEOCODING_API_URL}search?name=${location.value}&count=1&language=en&format=json`)
      .then((res) => {
        console.log(res);
        longitude.value = res.data.results[0].longitude;
        latitude.value = res.data.results[0].latitude;
        geocoding.value = res.data.results[0];
        getWeatherData();
      })
      .catch((err) => {
        console.log(err);
        weather.value = "Error: Location not found."
      });

  const getWeatherData = () => {
    axios
      .get(`${API_URL}forecast?latitude=${latitude.value}&longitude=${longitude.value}&current_weather=true&temperature_unit=${temperature_unit.value}`)
      .then((res) => {
          console.log(res);
          weather.value = res.data.current_weather
      })
      .catch((err) => {
          console.log(err);
          weather.value = "Error: Weather Data Error."
      });
    };
  }

  return { location, longitude, latitude, temperature_unit, weather, geocoding, getWeather, setLocation }
})

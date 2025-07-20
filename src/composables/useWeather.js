import { ref } from 'vue'
import {
  getWeatherByCity,
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords,
} from '../weatherService.js'

export function useWeather() {
  const current = ref(null)
  const forecast = ref(null)
  const loading = ref(false)
  const error = ref('')

  async function fetchByCity(name) {
    loading.value = true; error.value = ''
    try {
      current.value = await getWeatherByCity(name)
      forecast.value = await getForecastByCity(name)
    } catch {
      error.value = 'City not found or network error.'
    } finally {
      loading.value = false
    }
  }

  async function fetchByCoords(lat, lon) {
    loading.value = true; error.value = ''
    try {
      current.value = await getWeatherByCoords(lat, lon)
      forecast.value = await getForecastByCoords(lat, lon)
    } catch {
      error.value = 'Unable to fetch by coordinates.'
    } finally {
      loading.value = false
    }
  }

  return { current, forecast, loading, error, fetchByCity, fetchByCoords }
}

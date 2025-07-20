// src/weatherService.js

const BASE_URL = import.meta.env.VITE_BACKEND_URL || ''

async function fetchFromBackend(endpoint, params) {
  // BASE_URL + endpoint + ?keys
  const url = new URL(endpoint, BASE_URL || window.location.origin)
  Object.entries(params).forEach(([k, v]) =>
    url.searchParams.append(k, v)
  )

  const res = await fetch(url, { mode: 'cors' })
  if (!res.ok) {

    const err = await res.json().catch(() => null)
    throw new Error(err?.error || res.statusText)
  }
  return res.json()
}

// current e forecast ---
export function getWeatherByCity(city) {
  return fetchFromBackend('/api/weather', { city })
}
export function getForecastByCity(city) {
  return fetchFromBackend('/api/forecast', { city })
}
export function getWeatherByCoords(lat, lon) {
  return fetchFromBackend('/api/weather', { lat, lon })
}
export function getForecastByCoords(lat, lon) {
  return fetchFromBackend('/api/forecast', { lat, lon })
}

// autocomplete
export function searchCities(query) {
  return fetchFromBackend('/api/search', { city: query })
}

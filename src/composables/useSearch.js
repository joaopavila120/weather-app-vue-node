// src/composables/useSearch.js
import { getForecastByCity, getForecastByCoords } from '@/weatherService.js'
import { ref } from 'vue'

/**
 * city search (string | cityObj | coords),
 * update forecast and do scroll-to-top.
 */
export function useSearch({ fetchByCity, fetchByCoords }, transform, weekly) {
  const loadingSearch = ref(false)
  async function onSearch(payload) {
    loadingSearch.value = true
    //scroll to
    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (typeof payload === 'string') {
      await fetchByCity(payload)
      const raw = await getForecastByCity(payload)
      weekly.value = transform(raw)

    } else if (payload.name) {
      const q = `${payload.name},${payload.country}`
      await fetchByCity(q)
      const raw = await getForecastByCity(q)
      weekly.value = transform(raw)

    } else if (payload.latitude && payload.longitude) {
      await fetchByCoords(payload.latitude, payload.longitude)
      const raw = await getForecastByCoords(payload.latitude, payload.longitude)
      weekly.value = transform(raw)
    }
    loadingSearch.value = false
  }

  return { onSearch, loadingSearch }
}

// src/composables/useInitialWeather.js
import { onMounted, ref } from 'vue'
import { useFallbackCities } from '@/composables/useFallbackCities'

/**
 * On mount, tries geolocation → current+forecast,
 * otherwise fallback to a random city.
 * Exposes `fallback` list, `weekly` forecast e `reloadFallback()`.
 */
export function useInitialWeather(
  {
    fetchCurrentByCoords,
    fetchForecastByCoords,
    fetchCurrentByCity,
    fetchForecastByCity
  },
  transform
) {
  const weekly  = ref([])
  const { list: fallback, loadRandom } = useFallbackCities()

  onMounted(async () => {
    await loadRandom()  

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // if geolocation ok
        async ({ coords }) => {
          await fetchCurrentByCoords(coords.latitude, coords.longitude)
          const raw = await fetchForecastByCoords(coords.latitude, coords.longitude)
          weekly.value = transform(raw)
        },
        // if fail =  fallback
        async () => {
          const city = fallback.value[0]
          const name = `${city.name},${city.country}`
          await fetchCurrentByCity(name)
          const raw = await fetchForecastByCity(name)
          weekly.value = transform(raw)
        }
      )
    } else {
      // no geolocation api
      const city = fallback.value[0]
      const name = `${city.name},${city.country}`
      await fetchCurrentByCity(name)
      const raw = await fetchForecastByCity(name)
      weekly.value = transform(raw)
    }
  })

  /** reload suggested citiies*/
  async function reloadFallback() {
    await loadRandom()
  }

  return { fallback, weekly, reloadFallback }
}

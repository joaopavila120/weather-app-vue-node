// src/composables/useForecastTransform.js

/**
 * Transforms raw OpenWeatherMap 5‑day/3‑hour forecast into
 * a 5‑day summary list with day, description, min/max and icon.
 */
export function useForecastTransform() {
  function transform(raw) {
    const dailyMap = {}
    raw.list.forEach(entry => {
      const date = entry.dt_txt.split(' ')[0]
      dailyMap[date] = dailyMap[date] || []
      dailyMap[date].push(entry)
    })

    const today = new Date().toISOString().split('T')[0]
    return Object.entries(dailyMap)
      .filter(([date]) => date > today)      // skip today
      .slice(0, 5)                            // first 5 days
      .map(([date, entries]) => ({
        day: new Date(date).toLocaleDateString('en', { weekday: 'long' }),
        description: entries[0].weather[0].description,
        tempMax: Math.round(Math.max(...entries.map(e => e.main.temp))),
        tempMin: Math.round(Math.min(...entries.map(e => e.main.temp))),
        icon: `https://openweathermap.org/img/wn/${entries[0].weather[0].icon}.png`
      }))
  }

  return { transform }
}
import { ref } from 'vue'
import {  getWeatherByCity,
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords } from '../weatherService.js';



const ALL_CITIES = ['Lisbon','New York','Tokyo','Paris','Sydney','Moscow',
                    'Cairo','Rio de Janeiro', 'Passo Fundo', 'Dallas',
                    'Lublin', 'Sananduva', 'Viseu', 'Hamburg', 'Warsaw', 
                    'Chelm', 'Bologna', 'Cape Town', 'New Delhi']

export function useFallbackCities() {
  const list = ref([]) // 

  async function loadRandom() {
    const shuffled = ALL_CITIES.sort(() => Math.random() - 0.5)
    const pick = shuffled.slice(0,4)
    const promises = pick.map(name => getWeatherByCity(name))
    list.value = await Promise.all(promises)
  }

  return { list, loadRandom }
}

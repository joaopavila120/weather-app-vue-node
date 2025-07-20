<template>
  <div class="container">
    <h1 class="title">Weather App</h1>

    <SearchBar @search="onSearch" />

    <div v-if="loading || loadingSearch" class="status">Loading…</div>
    <div v-if="error"               class="status error">{{ error }}</div>

    <CurrentWeather :data="current" />

    <ForecastSection
      :forecast="forecast"
      :weekly="weekly"
    />

    <FallbackCities
      :cities="fallback"
      @select="onSearch"
      @shuffle="shuffleCities"
    />
  </div>
</template>

<script setup>
import { useWeather }            from '@/composables/useWeather'
import { useForecastTransform }  from '@/composables/useForecastTransform'
import { useInitialWeather }     from '@/composables/useInitialWeather'
import { useSearch }             from '@/composables/useSearch'
import { getForecastByCity, getForecastByCoords } from '@/weatherService.js'

import SearchBar        from '@/components/SearchBar.vue'
import CurrentWeather   from '@/components/CurrentWeather.vue'
import ForecastSection  from '@/components/ForecastSection.vue'
import FallbackCities   from '@/components/FallbackCities.vue'

const {
  current,
  forecast,
  loading,
  error,
  fetchByCity,
  fetchByCoords
} = useWeather()

const { transform } = useForecastTransform()

const { fallback, weekly, reloadFallback } = useInitialWeather(
  {
    fetchCurrentByCoords:  fetchByCoords,
    fetchForecastByCoords: getForecastByCoords,
    fetchCurrentByCity:    fetchByCity,
    fetchForecastByCity:   getForecastByCity
  },
  transform
)

const { onSearch: executeSearch, loadingSearch } = useSearch(
  { fetchByCity, fetchByCoords },
  transform,
  weekly
)

/** Valida qualquer payload “vazio” ou indefinido antes de buscar */
async function onSearch(payload) {
  // Bloqueia undefined/null ou string vazia
  if (!payload || (typeof payload === 'string' && !payload.trim())) {
    error.value = 'Por favor, informe uma cidade.'
    return
  }
  // Limpa erro anterior
  error.value = null
  // Dispara a busca real
  await executeSearch(payload)
}

async function shuffleCities() {
  await reloadFallback()
}
</script>

<style scoped>
.container { padding: 2rem; }
.title     { text-align: center; margin-bottom: 2rem; }
.status     { margin-top: 1rem; color: #555; }
.status.error { color: red; }

/* fade transition (mantido) */
.fade-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>

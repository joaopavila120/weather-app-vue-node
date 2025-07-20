<template>
  <div v-if="wd" class="current-weather">
    <h2>{{ wd.name }}, {{ wd.sys.country }}</h2>
    <p class="temp">{{ wd.main.temp.toFixed(1) }}°C</p>
    <p class="condition">{{ wd.weather[0].description }}</p>
    <img
      :src="`https://openweathermap.org/img/wn/${wd.weather[0].icon}@2x.png`"
      alt="weather icon"
    />
  </div>
</template>


<script setup>
const { data: wd } = defineProps({
  data: { type: Object, default: null }
})
</script>

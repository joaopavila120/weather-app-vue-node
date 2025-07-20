<template>
  <div class="city-card" @click="$emit('select', data.name)">
    <h3>{{ data.name }}, {{ data.sys.country }}</h3>
    <p>{{ data.main.temp.toFixed(1) }}°C</p>
    <img
      :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`"
      alt="icon"
    />
  </div>
</template>


<script setup>
defineProps({ data: Object })
</script>

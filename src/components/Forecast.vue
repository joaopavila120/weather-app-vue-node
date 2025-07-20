<template>
  <div v-if="fd" class="forecast">
    <!--limit 5 hours-->
    <div 
      v-for="item in fd.list.slice(0,5)" 
      :key="item.dt"
      class="forecast-item"
    >
      <p>{{ item.dt_txt.slice(11,16) }}</p>
      <img
        :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`"
        alt="icon"
      />
      <p>{{ item.main.temp.toFixed(1) }}°C</p>
    </div>
  </div>
</template>


<script setup>
const { data: fd } = defineProps({
  data: { type: Object, default: null }
})
</script>

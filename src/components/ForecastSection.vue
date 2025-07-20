<template>
  <Forecast :data="forecast" />

  <button @click="show = !show" class="btn-toggle">
    {{ show ? 'Hide' : 'Show next 5 days' }}
  </button>

  <transition-group name="fade" tag="div" class="forecast-grid">
    <DailyForecast
      v-for="(day, i) in show ? weekly : []"
      :key="day.day"
      :forecast="[day]"
    />
  </transition-group>
</template>

<script setup>
import { ref, watch } from 'vue'
import Forecast      from '@/components/Forecast.vue'
import DailyForecast from '@/components/DailyForecast.vue'

const props = defineProps({
  forecast: { type: Array, required: true },
  weekly:   { type: Array, required: true }
})

const show = ref(false)

// reset toggle whenever weekly data changes
watch(() => props.weekly, () => { show.value = false })
</script>

<style scoped>
.btn-toggle {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background-color: #ff6600;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.btn-toggle:hover { background-color: #e65c00; }
.forecast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}
</style>
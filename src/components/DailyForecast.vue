<template>
  <div class="forecast-wrapper">
    <TransitionGroup name="fade-stagger" tag="div" class="grid">
      <ForecastDayCard
        v-for="(day, index) in forecast"
        :key="index"
        v-bind="day"
        :style="{ animationDelay: `${index * 120}ms` }"
        class="fade-stagger-item"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import ForecastDayCard from './ForecastDayCard.vue'

defineProps({
  forecast: Array
})
</script>

<style scoped>
.forecast-wrapper {
  margin-top: 2rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

/* cascade */
.fade-stagger-item {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.4s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<template>
  <div class="forecast-card">
    <div class="time">{{ day }}</div>
    <img :src="icon" alt="weather icon" class="icon" />
    <div class="temp">{{ tempMax }}° / {{ tempMin }}°</div>
    <div class="desc">{{ description }}</div>
  </div>
</template>

<script setup>
defineProps({
  day: String,
  description: String,
  tempMax: Number,
  tempMin: Number,
  icon: String
})
</script>

<style scoped>
.forecast-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  text-align: center;
  font-family: 'Inter', sans-serif;
  color: #2c3e50;
}
.time {
  font-weight: 600;
  font-size: 0.95rem;
}
.icon {
  width: 40px;
  height: 40px;
  margin: 0.5rem 0;
}
.temp {
  font-weight: 600;
  font-size: 1rem;
  color: #333;
}
.desc {
  font-size: 0.85rem;
  color: #777;
}
</style>

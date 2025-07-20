<template>
  <div class="search-bar">
    <input
      v-model="term"
      @input="onInput"
      @keydown.enter.prevent="select(suggestions[0])"
      placeholder="Search city... (ex: Lisbon, Passo Fundo, Cairo...)"
    />
    <button @click="select(suggestions[0])">Search</button>
  </div>
  <ul v-if="suggestions.length" class="suggestions">
    <li
      v-for="s in suggestions"
      :key="s.lat + s.lon"
      @click="select(s)"
    >
      {{ s.name }}, {{ s.country }}
    </li>
  </ul>
</template>


<script setup>
import { ref } from 'vue'
import debounce from 'lodash.debounce'
import { searchCities } from '../weatherService.js'



const emit = defineEmits(['search'])
const term = ref('')
const suggestions = ref([])

const fetchSuggestions = debounce(async () => {
  if (term.value.trim().length < 2) {
    suggestions.value = []
    return
  }
  suggestions.value = await searchCities(term.value.trim())
}, 500)

function onInput() {
  fetchSuggestions()
}

function select(item) {
  emit('search', item)
  term.value = ''
  suggestions.value = []
}
</script>

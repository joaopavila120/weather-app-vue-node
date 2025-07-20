// config.js

import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 5000

export const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY
if (!OPENWEATHER_KEY) {
  throw new Error('OPENWEATHER_KEY environment variable is not set.')
}

// Caching
export const CACHE_DURATIONS = {
  weather: '10 minutes',
  forecast: '10 minutes',
  search: '5 minutes',
}

// Rate‑limit rules
// 50 req/hour for weather
// 30 req/minute}
export const RATE_LIMIT_RULES = {
  weatherWindow: 60 * 60 * 1000, // 1 hour
  weatherMax: 50,
  searchWindow: 60 * 1000,       // 1 minute
  searchMax: 30
}

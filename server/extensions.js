// extensions.js
// Gather all shared middlewares here

import cors from 'cors'
import rateLimit from 'express-rate-limit'
import apicache from 'apicache'
import {
  CACHE_DURATIONS,
  RATE_LIMIT_RULES
} from './config.js'

// CORS middleware
export const corsMiddleware = cors()

// In‑memory cache middleware
const cache = apicache.middleware
export const cacheWeather = cache(CACHE_DURATIONS.weather)
export const cacheForecast = cache(CACHE_DURATIONS.forecast)
export const cacheSearch   = cache(CACHE_DURATIONS.search)

// Rate‑limiters
export const weatherLimiter = rateLimit({
  windowMs: RATE_LIMIT_RULES.weatherWindow,
  max:      RATE_LIMIT_RULES.weatherMax,
  standardHeaders: true,
  legacyHeaders:    false
})

export const searchLimiter = rateLimit({
  windowMs: RATE_LIMIT_RULES.searchWindow,
  max:      RATE_LIMIT_RULES.searchMax,
  standardHeaders: true,
  legacyHeaders:    false
})

// routes/weather.js
import { Router } from 'express'
import axios from 'axios'
import {
  cacheWeather,
  cacheForecast,
  weatherLimiter
} from '../extensions.js'
import { OPENWEATHER_KEY } from '../config.js'

const router = Router()
const API_BASE = 'https://api.openweathermap.org/data/2.5'

// helper to forward request to OWM
async function proxyRequest(path, params) {
  params.appid  = OPENWEATHER_KEY
  params.units  = 'metric'

  const url = `${API_BASE}/${path}`
  const resp = await axios.get(url, { params })
  return resp.data
}

// GET /api/weather?city=...  or  ?lat=...&lon=...
router.get(
  '/weather',
  weatherLimiter,
  cacheWeather,
  async (req, res) => {
    try {
      const { city, lat, lon } = req.query
      if (!city && (!lat || !lon)) {
        return res.status(400)
                  .json({ error:'Missing "city" or "lat" & "lon" parameters.' })
      }
      const params = city
        ? { q: city }
        : { lat, lon }
      const data = await proxyRequest('weather', params)
      res.json(data)
    } catch (err) {
      const status = err.response?.status || 500
      const msg    = err.response?.data?.message || err.message
      res.status(status).json({ error: msg })
    }
  }
)

// GET /api/forecast?city=...  or  ?lat=...&lon=...
router.get(
  '/forecast',
  weatherLimiter,
  cacheForecast,
  async (req, res) => {
    try {
      const { city, lat, lon } = req.query
      if (!city && (!lat || !lon)) {
        return res.status(400)
                  .json({ error:'Missing "city" or "lat" & "lon" parameters.' })
      }
      const params = city
        ? { q: city }
        : { lat, lon }
      const data = await proxyRequest('forecast', params)
      res.json(data)
    } catch (err) {
      const status = err.response?.status || 500
      const msg    = err.response?.data?.message || err.message
      res.status(status).json({ error: msg })
    }
  }
)

export default router

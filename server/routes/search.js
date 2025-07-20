// routes/search.js
import { Router } from 'express'
import axios from 'axios'
import {
  cacheSearch,
  searchLimiter
} from '../extensions.js'
import { OPENWEATHER_KEY } from '../config.js'

const router = Router()
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct'

// GET /api/search?city=...
router.get(
  '/search',
  searchLimiter,
  cacheSearch,
  async (req, res) => {
    try {
      const q = req.query.city
      if (!q) {
        return res.status(400)
                  .json({ error:'Missing "city" parameter.' })
      }
      const resp = await axios.get(GEO_URL, {
        params: { q, limit: 10, appid: OPENWEATHER_KEY }
      })
      // dedupe up to 5 unique city-country combos
      const unique = []
      const seen   = new Set()
      for (const item of resp.data) {
        const key = `${item.name}-${item.country}`
        if (!seen.has(key)) {
          seen.add(key)
          unique.push(item)
        }
        if (unique.length >= 5) break
      }
      res.json(unique)
    } catch (err) {
      const status = err.response?.status || 500
      res.status(status)
         .json({ error: err.response?.data?.message || err.message })
    }
  }
)

export default router

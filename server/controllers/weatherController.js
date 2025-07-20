import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const API_BASE = 'https://api.openweathermap.org/data/2.5'
const GEO_BASE = 'http://api.openweathermap.org/geo/1.0/direct'
const KEY = process.env.OPENWEATHER_KEY

// Verifica se a chave está chegando
console.log('🔑 OPENWEATHER_KEY =', KEY)

export async function fetchCurrentWeather(req, res) {
  try {
    let url
    if (req.query.city) {
      url = `${API_BASE}/weather?q=${encodeURIComponent(req.query.city)}&units=metric&appid=${KEY}`
    } else if (req.query.lat && req.query.lon) {
      url = `${API_BASE}/weather?lat=${req.query.lat}&lon=${req.query.lon}&units=metric&appid=${KEY}`
    } else {
      return res.status(400).json({ error: 'Missing city or coordinates' })
    }

    console.log('➡️ Fetching CURRENT from URL:', url)
    const response = await axios.get(url)
    return res.json(response.data)

  } catch (err) {
    // detalhe do erro da OpenWeather
    console.error('❌ Error fetching CURRENT:', err.response?.status, err.response?.data || err.message)
    return res
      .status(err.response?.status || 500)
      .json({ error: err.response?.data?.message || 'Error fetching current weather' })
  }
}

export async function fetchForecastWeather(req, res) {
  try {
    let url
    if (req.query.city) {
      url = `${API_BASE}/forecast?q=${encodeURIComponent(req.query.city)}&units=metric&appid=${KEY}`
    } else if (req.query.lat && req.query.lon) {
      url = `${API_BASE}/forecast?lat=${req.query.lat}&lon=${req.query.lon}&units=metric&appid=${KEY}`
    } else {
      return res.status(400).json({ error: 'Missing city or coordinates' })
    }

    console.log('➡️ Fetching FORECAST from URL:', url)
    const response = await axios.get(url)
    return res.json(response.data)

  } catch (err) {
    console.error('❌ Error fetching FORECAST:', err.response?.status, err.response?.data || err.message)
    return res
      .status(err.response?.status || 500)
      .json({ error: err.response?.data?.message || 'Error fetching forecast' })
  }
}

export async function fetchCitySuggestions(req, res) {
  try {
    const q = req.query.q
    if (!q) return res.status(400).json({ error: 'Missing query q' })

    const url = `${GEO_BASE}?q=${encodeURIComponent(q)}&limit=5&appid=${KEY}`
    console.log('➡️ Fetching SEARCH from URL:', url)
    const response = await axios.get(url)
    return res.json(response.data)

  } catch (err) {
    console.error('❌ Error fetching SEARCH:', err.response?.status, err.response?.data || err.message)
    return res
      .status(err.response?.status || 500)
      .json({ error: err.response?.data?.message || 'Error fetching city suggestions' })
  }
}

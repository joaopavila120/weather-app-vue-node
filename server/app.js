// app.js
// Entry point: assemble & run Express app

import express from 'express'
import dotenv from 'dotenv'
import { corsMiddleware } from './extensions.js'
import weatherRoutes from './routes/weather.js'
import searchRoutes  from './routes/search.js'
import { PORT }      from './config.js'

dotenv.config()

const app = express()

// enable CORS for all endpoints
app.use(corsMiddleware)

// JSON body parser (not strictly needed for GET-only)
app.use(express.json())

// mount under /api
app.use('/api', weatherRoutes)
app.use('/api', searchRoutes)

// start!
app.listen(PORT, () => {
  console.log(`🚀 Weather-API server listening at http://localhost:${PORT}`)
})

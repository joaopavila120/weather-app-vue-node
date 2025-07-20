# Weather Dashboard

A simple Vue 3 weather dashboard that fetches current weather and a 5‑day forecast from the OpenWeatherMap API. Built with Vue and express.

## Features

- current weather display
- search new cities to check the weather
- caching
- rate limiting
- cors
  
## Prerequisites
- Node.js (v14+)
- NPM or Yarn
- An OpenWeatherMap API key

## Setup

1. **Clone the repo**  
   ```bash
   git clone https://github.com/joaopavila120/weather-app-vue-node.git
   cd weather-app-vue-node
   ```

2. **frontend**  
   ```bash
   npm install
   npm run dev
   ```
3. **backend**
```bash
cd server
npm install
npm start
```

The backend listens on http://localhost:5000 by default.
Note: The API key is intentionally exposed in the .env file for testing purposes. You don’t need to hide it in this demo repo—just follow the steps, run the backend and frontend, and test away!

## Printscreen: 
<img width="1295" height="865" alt="image" src="https://github.com/user-attachments/assets/86154b81-f929-4e84-89e5-08f082723d1b" />


require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'Web Pages', 'index.html')));

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude parameters are required' });
  }

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

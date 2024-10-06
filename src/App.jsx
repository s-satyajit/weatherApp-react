import './App.css'
import {useState} from 'react'

function App() {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  const handleFormSubmit = (e) => {
    e.preventDefault(); //Prevent default behavior of form submission
  }

  const fetchWeather = async () => {
    setLoading(true)
    setError(null)
    setWeatherData(null)

    const apiKey = `552d90f1f77d40658d974951241709`;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
    if(!response.ok) {
      throw new Error('City not found or API request failed')
    }
    const data = await response.json()
    setWeatherData(data)
    } catch (error) {
    console.error('Error fetching weather data:', error)
    }
  }

  return (
    <>
      <div className='weather-app'>
        <h1>Weather App</h1>
        
        {/* Input form for city name */}
        <form onSubmit={handleFormSubmit}>
          <input
          type='text'
          value={city}
          placeholder='Enter city name'
          onChange={(e) => setCity(e.target.value)}
          />
          <button type='submit'>Get Weather</button>
        </form>
      </div>

      {/* Display weather data */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}</p>
        </div>
      )}
    </>
  )
}

export default App

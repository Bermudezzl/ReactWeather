import React, { useState, useEffect } from 'react';
import './App.css';
import { WiDaySunny, WiCloud, WiRain, WiSnow } from 'react-icons-weather';


const API_KEY = '6b6a498b77c94a32bfe533393e80bbef';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(
          city
        )}&key=${API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data.data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Condiciones climáticas en México</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese una ciudad"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Obtener clima</button>
      </form>
      {loading && <p>Cargando...</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.city_name}</h2>
          <p>Temperatura: {weatherData.temp}&deg;C</p>
          <p>Descripción: {getSpanishWeatherDescription(weatherData.weather.description)}</p>
        </div>
      )}
    </div>
  );
};


const getSpanishWeatherDescription = (description) => {
  switch (description) {
    case 'Few clouds':
      return 'Algunas nubes';
    case 'Scattered clouds':
      return 'Nubes dispersas';
    case 'Broken clouds':
      return 'Nubes rotas';
    case 'Overcast clouds':
      return 'Nubes cubiertas';
    case 'Clear sky':
      return 'Cielo despejado';
    case 'Light rain':
      return 'Lluvia ligera';
    case 'Moderate rain':
      return 'Lluvia moderada';
    case 'Heavy rain':
      return 'Lluvia intensa';
   //
    default:
      return description;
  }
};

export default App;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch weather data
  const fetchData = useCallback(async (city) => {
    if (!city) return;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6bf9a983128db508b716928fe1935e3b`);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    }
  }, []);

  // Handle input change with debounce
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(city);
  };

  // Use effect to fetch weather data when city changes
  useEffect(() => {
    if (city) {
      fetchData(city);
    }
  }, [city, fetchData]);

  return (
    <div className='id'>
      <form className='clas' onSubmit={handleSubmit}>
        <div className='container-fluid sec'>
          <div className='row'>
            <div className='col-12'>
              <h2>Enter Your City Name</h2>
              <input
                className='my-3 py-2 px-3'
                type="text"
                placeholder="Enter Your City name"
                value={city}
                onChange={handleInputChange}
              />
              <br />
            </div>
            <div className='col-12'>
              <button type="submit" className='btn btn-success mb-3'>Submit</button>
            </div>
          </div>
        </div>
      </form>
      {error && <div className='text-danger'>{error}</div>}
      {weatherData && (
        <div className='text-dark fw'>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Feels like: {weatherData.main.feels_like} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Pressure: {weatherData.main.pressure}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

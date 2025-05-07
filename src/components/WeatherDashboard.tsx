import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import ForecastList from './ForecastList';
import PopularCities from './PopularCities';
import WeatherInsights from './WeatherInsights';
import { fetchWeatherData, fetchForecastData } from '../services/weatherService';
import { WeatherData, ForecastData } from '../types/weather';
import LoadingSpinner from './LoadingSpinner';

const WeatherDashboard: React.FC = () => {
  const [city, setCity] = useState<string>('Mumbai');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const weather = await fetchWeatherData(city, unit);
        setWeatherData(weather);
        
        const forecast = await fetchForecastData(city, unit);
        setForecastData(forecast);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [city, unit]);

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
          India Weather Forecast
        </h1>
        <p className="text-gray-400">Get accurate weather forecasts for cities across India</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <SearchBar onSearch={handleCityChange} />
          </div>
          
          <div className="mb-6">
            <PopularCities onCitySelect={handleCityChange} />
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {weatherData && (
                <div className="mb-8">
                  <div className="flex justify-end mb-2">
                    <button 
                      onClick={toggleUnit} 
                      className="text-sm bg-gray-800 px-3 py-1 rounded-full shadow-sm hover:bg-gray-700 transition-colors duration-200 flex items-center text-gray-200"
                    >
                      <span className={`mr-2 ${unit === 'metric' ? 'font-bold' : ''}`}>°C</span>
                      <div className="w-8 h-4 bg-gray-700 rounded-full flex items-center p-0.5">
                        <div className={`w-3 h-3 bg-blue-400 rounded-full transform transition-transform duration-200 ${unit === 'metric' ? 'translate-x-0' : 'translate-x-4'}`}></div>
                      </div>
                      <span className={`ml-2 ${unit === 'imperial' ? 'font-bold' : ''}`}>°F</span>
                    </button>
                  </div>
                  <CurrentWeather weather={weatherData} unit={unit} />
                </div>
              )}
              
              {forecastData && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-200 mb-4">5-Day Forecast for {city}</h2>
                  <ForecastList forecast={forecastData} unit={unit} />
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <WeatherInsights weatherData={weatherData} forecastData={forecastData} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
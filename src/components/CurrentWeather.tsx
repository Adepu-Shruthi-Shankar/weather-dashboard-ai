import React from 'react';
import { WeatherData } from '../types/weather';
import { formatDate, getWeatherIconPath, getBackgroundGradient } from '../utils/formatters';
import { Droplets, Wind, Thermometer, Compass } from 'lucide-react';

interface CurrentWeatherProps {
  weather: WeatherData;
  unit: 'metric' | 'imperial';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, unit }) => {
  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const background = getBackgroundGradient(weather.weather[0].id);

  return (
    <div className={`rounded-xl overflow-hidden shadow-lg ${background} transition-all duration-500`}>
      <div className="p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h2 className="text-3xl font-bold mb-1">{weather.name}</h2>
              <p className="text-lg opacity-90">{formatDate(weather.dt)}</p>
              <p className="text-lg">{weather.weather[0].description}</p>
            </div>
            
            <div className="flex items-center">
              <img 
                src={getWeatherIconPath(weather.weather[0].icon)} 
                alt={weather.weather[0].description}
                className="w-24 h-24 mr-4 animate-pulse"
              />
              <div>
                <div className="text-5xl font-bold">{temp}°{unit === 'metric' ? 'C' : 'F'}</div>
                <div className="flex items-center mt-1">
                  <Thermometer size={16} className="mr-1" />
                  <span>Feels like {feelsLike}°{unit === 'metric' ? 'C' : 'F'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center">
                <Droplets size={24} className="mr-3 text-blue-200" />
                <div>
                  <p className="text-sm opacity-80">Humidity</p>
                  <p className="text-xl font-semibold">{weather.main.humidity}%</p>
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center">
                <Wind size={24} className="mr-3 text-blue-200" />
                <div>
                  <p className="text-sm opacity-80">Wind Speed</p>
                  <p className="text-xl font-semibold">
                    {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center">
                <Compass size={24} className="mr-3 text-blue-200" />
                <div>
                  <p className="text-sm opacity-80">Pressure</p>
                  <p className="text-xl font-semibold">{weather.main.pressure} hPa</p>
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-blue-200">
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                <div>
                  <p className="text-sm opacity-80">Visibility</p>
                  <p className="text-xl font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
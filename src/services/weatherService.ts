import { WeatherData, ForecastData } from '../types/weather';
import { generateWeatherInsights } from '../utils/weatherInsights';

const API_KEY = '75f9c35bac94fe1eda57d3944737e7b8'; // Replace with your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (
  city: string, 
  unit: 'metric' | 'imperial' = 'metric'
): Promise<WeatherData> => {
  // For demo purposes - replace with actual API call
  return mockWeatherData(city, unit);
  
  // Uncomment to use real API:
  /*
  const response = await fetch(
    `${BASE_URL}/weather?q=${city},in&units=${unit}&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return await response.json();
  */
};

export const fetchForecastData = async (
  city: string,
  unit: 'metric' | 'imperial' = 'metric'
): Promise<ForecastData> => {
  // For demo purposes - replace with actual API call
  return mockForecastData(city, unit);
  
  // Uncomment to use real API:
  /*
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city},in&units=${unit}&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  
  return await response.json();
  */
};

// Mock data for demonstration purposes
function mockWeatherData(city: string, unit: 'metric' | 'imperial'): WeatherData {
  const isMetric = unit === 'metric';
  const temp = isMetric ? 
    Math.floor(Math.random() * 15) + 20 : // 20-35°C
    Math.floor(Math.random() * 30) + 65;  // 65-95°F
  
  const conditions = [
    { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
    { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
    { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
    { id: 721, main: 'Haze', description: 'haze', icon: '50d' }
  ];
  
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    coord: { lon: 72.8479, lat: 19.0144 },
    weather: [condition],
    base: 'stations',
    main: {
      temp: temp,
      feels_like: temp - 2,
      temp_min: temp - 3,
      temp_max: temp + 2,
      pressure: 1010,
      humidity: Math.floor(Math.random() * 30) + 50
    },
    visibility: 10000,
    wind: {
      speed: isMetric ? 3.6 : 8,
      deg: 270
    },
    clouds: {
      all: Math.floor(Math.random() * 100)
    },
    dt: Date.now() / 1000,
    sys: {
      type: 1,
      id: 9052,
      country: 'IN',
      sunrise: 1620776400,
      sunset: 1620823800
    },
    timezone: 19800,
    id: 1275339,
    name: city,
    cod: 200
  };
}

function mockForecastData(city: string, unit: 'metric' | 'imperial'): ForecastData {
  const isMetric = unit === 'metric';
  const forecasts = [];
  const now = new Date();
  
  const conditions = [
    { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
    { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
    { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
    { id: 721, main: 'Haze', description: 'haze', icon: '50d' }
  ];
  
  // Generate forecast for next 5 days
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(now.getDate() + i);
    
    const baseTemp = isMetric ? 
      Math.floor(Math.random() * 15) + 20 : // 20-35°C
      Math.floor(Math.random() * 30) + 65;  // 65-95°F
    
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const forecast = {
      dt: date.getTime() / 1000,
      main: {
        temp: baseTemp,
        feels_like: baseTemp - 2,
        temp_min: baseTemp - 3,
        temp_max: baseTemp + 2,
        pressure: 1010,
        humidity: Math.floor(Math.random() * 30) + 50
      },
      weather: [condition],
      clouds: {
        all: Math.floor(Math.random() * 100)
      },
      wind: {
        speed: isMetric ? Math.random() * 5 + 1 : Math.random() * 10 + 3,
        deg: Math.floor(Math.random() * 360)
      },
      visibility: 10000,
      pop: Math.random(),
      sys: {
        pod: 'd'
      },
      dt_txt: date.toISOString()
    };
    
    // Add AI insights to each forecast
    const insights = generateWeatherInsights(forecast);
    forecasts.push({ ...forecast, insights });
  }
  
  return {
    cod: '200',
    message: 0,
    cnt: forecasts.length,
    list: forecasts,
    city: {
      id: 1275339,
      name: city,
      coord: { lat: 19.0144, lon: 72.8479 },
      country: 'IN',
      population: 12691836,
      timezone: 19800,
      sunrise: 1620776400,
      sunset: 1620823800
    }
  };
}
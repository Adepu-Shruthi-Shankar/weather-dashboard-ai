import { ForecastItem } from '../types/weather';

export function generateWeatherInsights(forecast: ForecastItem): ForecastItem['insights'] {
  const { temp, humidity } = forecast.main;
  const { speed: windSpeed } = forecast.wind;
  const { description, id: weatherId } = forecast.weather[0];
  
  let trend = '';
  let recommendation = '';
  let severity: 'low' | 'moderate' | 'high' = 'low';

  // Temperature analysis
  if (temp > 35) {
    trend = 'Extreme heat conditions';
    recommendation = 'Stay hydrated and avoid outdoor activities during peak hours';
    severity = 'high';
  } else if (temp > 30) {
    trend = 'Hot weather expected';
    recommendation = 'Use sun protection and stay hydrated';
    severity = 'moderate';
  } else if (temp < 15) {
    trend = 'Cool conditions';
    recommendation = 'Carry warm clothing';
    severity = 'low';
  }

  // Rain analysis
  if (weatherId >= 500 && weatherId < 600) {
    trend = 'Rainfall expected';
    recommendation = 'Carry an umbrella and watch for water logging';
    severity = 'moderate';
  }

  // Thunderstorm analysis
  if (weatherId >= 200 && weatherId < 300) {
    trend = 'Thunderstorm alert';
    recommendation = 'Stay indoors and avoid open areas';
    severity = 'high';
  }

  // Wind analysis
  if (windSpeed > 10) {
    trend = 'Strong winds expected';
    recommendation = 'Secure loose objects and exercise caution';
    severity = 'moderate';
  }

  // Humidity analysis
  if (humidity > 80) {
    trend = 'High humidity levels';
    recommendation = 'Stay in ventilated areas and use air conditioning if possible';
    severity = 'moderate';
  }

  return {
    trend,
    recommendation,
    severity
  };
}
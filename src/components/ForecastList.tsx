import React from 'react';
import { ForecastData } from '../types/weather';
import { formatForecastDate, getWeatherIconPath, getWeatherConditionClass } from '../utils/formatters';
import { AlertTriangle, Info } from 'lucide-react';

interface ForecastListProps {
  forecast: ForecastData;
  unit: 'metric' | 'imperial';
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast, unit }) => {
  // Group forecast by day to get 5-day forecast
  const dailyForecasts = forecast.list.reduce<{ [key: string]: any }>((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    if (!acc[date]) {
      acc[date] = item;
    }
    
    return acc;
  }, {});
  
  // Get 5 days of forecast data
  const forecastDays = Object.values(dailyForecasts).slice(0, 5);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {forecastDays.map((day: any, index) => {
        const conditionClass = getWeatherConditionClass(day.weather[0].id);
        
        return (
          <div 
            key={index} 
            className={`${conditionClass} rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105`}
          >
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">{formatForecastDate(day.dt)}</h3>
              
              <div className="flex justify-center mb-3">
                <img 
                  src={getWeatherIconPath(day.weather[0].icon)} 
                  alt={day.weather[0].description}
                  className="w-16 h-16"
                />
              </div>
              
              <p className="text-2xl font-bold mb-1">
                {Math.round(day.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
              </p>
              
              <p className="text-sm capitalize mb-3">
                {day.weather[0].description}
              </p>
              
              <div className="flex justify-between text-sm mb-3">
                <span>
                  H: {Math.round(day.main.temp_max)}°
                </span>
                <span>
                  L: {Math.round(day.main.temp_min)}°
                </span>
              </div>

              {day.insights && (
                <div className="mt-3 border-t border-white/20 pt-3">
                  <div className="flex items-start gap-2">
                    {day.insights.severity === 'high' ? (
                      <AlertTriangle className="w-5 h-5 text-red-300 flex-shrink-0 mt-1" />
                    ) : (
                      <Info className="w-5 h-5 text-blue-200 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{day.insights.trend}</p>
                      <p className="text-sm opacity-90">{day.insights.recommendation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastList;
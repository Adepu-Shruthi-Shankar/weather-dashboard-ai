import React from 'react';
import { BrainCircuit, AlertTriangle, Info } from 'lucide-react';
import { WeatherData, ForecastData } from '../types/weather';
import { generateWeatherInsights } from '../utils/weatherInsights';

interface WeatherInsightsProps {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
}

const WeatherInsights: React.FC<WeatherInsightsProps> = ({ weatherData, forecastData }) => {
  if (!weatherData || !forecastData) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-200">AI Weather Insights</h2>
        </div>
        <p className="text-gray-400">Loading weather insights...</p>
      </div>
    );
  }

  const currentInsights = generateWeatherInsights({
    ...forecastData.list[0],
    weather: weatherData.weather,
    main: weatherData.main,
    wind: weatherData.wind,
  });

  const trendingPatterns = forecastData.list.slice(0, 5).map(day => generateWeatherInsights(day));
  const severityCount = trendingPatterns.filter(p => p.severity === 'high').length;
  const hasWarnings = severityCount > 0;

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <BrainCircuit className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-gray-200">AI Weather Insights</h2>
      </div>

      {/* Current Weather Analysis */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-300 mb-3">Current Conditions</h3>
        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="flex items-start gap-2">
            {currentInsights.severity === 'high' ? (
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
            ) : (
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
            )}
            <div>
              <p className="text-gray-200 font-medium">{currentInsights.trend}</p>
              <p className="text-gray-400 text-sm mt-1">{currentInsights.recommendation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Trend Analysis */}
      <div>
        <h3 className="text-lg font-medium text-gray-300 mb-3">5-Day Trend Analysis</h3>
        <div className="bg-gray-900/50 rounded-lg p-4">
          {hasWarnings && (
            <div className="flex items-center gap-2 mb-4 text-red-400 bg-red-400/10 p-3 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
              <p className="text-sm">
                {severityCount} weather warning{severityCount > 1 ? 's' : ''} detected in the next 5 days
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            {trendingPatterns.map((pattern, index) => (
              <div key={index} className="flex items-start gap-2">
                {pattern.severity === 'high' ? (
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                ) : (
                  <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                )}
                <div>
                  <p className="text-gray-200 font-medium">{pattern.trend}</p>
                  <p className="text-gray-400 text-sm mt-1">{pattern.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInsights;
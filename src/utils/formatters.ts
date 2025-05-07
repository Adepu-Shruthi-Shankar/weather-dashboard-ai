/**
 * Formats a Unix timestamp to a readable date string
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Formats a Unix timestamp to a readable forecast date
 */
export function formatForecastDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Returns the path to the weather icon based on the icon code
 */
export function getWeatherIconPath(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

/**
 * Returns the appropriate background gradient based on weather condition code
 */
export function getBackgroundGradient(conditionCode: number): string {
  // Clear
  if (conditionCode === 800) {
    return 'bg-gradient-to-br from-blue-400 to-blue-700';
  }
  
  // Clouds
  if (conditionCode >= 801 && conditionCode <= 804) {
    return 'bg-gradient-to-br from-blue-300 to-gray-500';
  }
  
  // Rain
  if ((conditionCode >= 500 && conditionCode <= 531) || 
      (conditionCode >= 300 && conditionCode <= 321)) {
    return 'bg-gradient-to-br from-gray-400 to-gray-700';
  }
  
  // Thunderstorm
  if (conditionCode >= 200 && conditionCode <= 232) {
    return 'bg-gradient-to-br from-gray-700 to-gray-900';
  }
  
  // Snow
  if (conditionCode >= 600 && conditionCode <= 622) {
    return 'bg-gradient-to-br from-blue-100 to-blue-300';
  }
  
  // Atmosphere (fog, mist, etc.)
  if (conditionCode >= 701 && conditionCode <= 781) {
    return 'bg-gradient-to-br from-gray-300 to-gray-500';
  }
  
  // Default
  return 'bg-gradient-to-br from-blue-400 to-blue-700';
}

/**
 * Returns the appropriate CSS class for forecast card based on weather condition
 */
export function getWeatherConditionClass(conditionCode: number): string {
  // Clear
  if (conditionCode === 800) {
    return 'bg-gradient-to-b from-blue-400 to-blue-500 text-white';
  }
  
  // Clouds
  if (conditionCode >= 801 && conditionCode <= 804) {
    return 'bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800';
  }
  
  // Rain
  if ((conditionCode >= 500 && conditionCode <= 531) || 
      (conditionCode >= 300 && conditionCode <= 321)) {
    return 'bg-gradient-to-b from-blue-600 to-blue-700 text-white';
  }
  
  // Thunderstorm
  if (conditionCode >= 200 && conditionCode <= 232) {
    return 'bg-gradient-to-b from-purple-700 to-purple-800 text-white';
  }
  
  // Snow
  if (conditionCode >= 600 && conditionCode <= 622) {
    return 'bg-gradient-to-b from-blue-100 to-blue-200 text-gray-800';
  }
  
  // Atmosphere (fog, mist, etc.)
  if (conditionCode >= 701 && conditionCode <= 781) {
    return 'bg-gradient-to-b from-gray-400 to-gray-500 text-white';
  }
  
  // Default
  return 'bg-gradient-to-b from-blue-400 to-blue-500 text-white';
}
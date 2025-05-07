import React from 'react';

interface PopularCitiesProps {
  onCitySelect: (city: string) => void;
}

const popularIndianCities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Jaipur',
  'Ahmedabad'
];

const PopularCities: React.FC<PopularCitiesProps> = ({ onCitySelect }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-300 mb-3">Popular Cities</h3>
      <div className="flex flex-wrap gap-2">
        {popularIndianCities.map((city) => (
          <button
            key={city}
            onClick={() => onCitySelect(city)}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full shadow-sm hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularCities;
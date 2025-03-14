import { XMarkIcon } from '@heroicons/react/24/outline';
import { Country } from '@/types/country';

interface CountryCardProps {
  country: Country;
  onRemove: (country: Country) => void;
}

export function CountryCard({ country, onRemove }: CountryCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow transform transition-all duration-300 ease-in-out hover:shadow-lg relative">
      <button
        onClick={() => onRemove(country)}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
        title="Remove country"
      >
        <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      </button>
      <h3 className="text-xl font-semibold pr-8">{country.name.common}</h3>
      <div className="mt-2">
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Area: {country.area.toLocaleString()} km²</p>
        <p>Region: {country.region}</p>
      </div>
    </div>
  );
} 
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Country } from '@/types/country';
import { CountryCard } from './CountryCard';

interface CountryComparisonProps {
  isVisible: boolean;
  countries: Country[];
  onClose: () => void;
  onRemoveCountry: (country: Country) => void;
}

export function CountryComparison({ 
  isVisible, 
  countries, 
  onClose, 
  onRemoveCountry 
}: CountryComparisonProps) {
  return (
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Country Comparison</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            title="Close comparison"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {countries.map(country => (
            <CountryCard
              key={country.name.common}
              country={country}
              onRemove={onRemoveCountry}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 
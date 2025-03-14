import Link from 'next/link';
import { Country } from '@/types/country';

interface CountriesTableProps {
  countries: Country[];
  selectedCountries: Country[];
  onCountrySelect: (country: Country) => void;
}

export function CountriesTable({ countries, selectedCountries, onCountrySelect }: CountriesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flag</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capital</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Population</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {countries.map((country) => {
            const isSelected = selectedCountries.find(c => c.name.common === country.name.common);
            const isDisabled = selectedCountries.length >= 2 && !isSelected;
            
            return (
              <tr
                key={country.name.common}
                className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                    className="h-6 w-auto"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/country/${encodeURIComponent(country.name.common)}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {country.name.common}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {country.capital?.[0] || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{country.region}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {country.population.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onCountrySelect(country)}
                    className={`px-3 py-1 rounded transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
                        : isDisabled
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200'
                    }`}
                    disabled={isDisabled}
                  >
                    {isSelected ? 'Selected' : 'Compare'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LoadingPage } from '@/components/ui/loading';
import { Country } from '@/types/country';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <LoadingPage />;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const handleCountrySelect = (country: Country) => {
    if (selectedCountries.length < 2 && !selectedCountries.find(c => c.name.common === country.name.common)) {
      setSelectedCountries([...selectedCountries, country]);
    } else if (selectedCountries.find(c => c.name.common === country.name.common)) {
      setSelectedCountries(selectedCountries.filter(c => c.name.common !== country.name.common));
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Countries Explorer</h1>
      
      {/* Search Bar */}
      <div className="relative mb-8">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search countries..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Country Comparison */}
      {selectedCountries.length > 0 && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Country Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedCountries.map(country => (
              <div key={country.name.common} className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold">{country.name.common}</h3>
                <div className="mt-2">
                  <p>Population: {country.population.toLocaleString()}</p>
                  <p>Area: {country.area.toLocaleString()} km²</p>
                  <p>Region: {country.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Countries Table */}
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
            {filteredCountries.map((country) => (
              <tr
                key={country.name.common}
                className={`hover:bg-gray-50 ${
                  selectedCountries.find(c => c.name.common === country.name.common)
                    ? 'bg-blue-50'
                    : ''
                }`}
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
                    onClick={() => handleCountrySelect(country)}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      selectedCountries.find(c => c.name.common === country.name.common)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    disabled={
                      selectedCountries.length >= 2 &&
                      !selectedCountries.find(c => c.name.common === country.name.common)
                    }
                  >
                    {selectedCountries.find(c => c.name.common === country.name.common)
                      ? 'Selected'
                      : 'Compare'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

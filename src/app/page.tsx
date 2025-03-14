'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { LoadingPage } from '@/components/ui/loading';
import { Country } from '@/types/country';
import { ALL_COUNTRIES } from '@/lib/apollo-client';
import { SearchBar } from '@/components/search/SearchBar';
import { CountryComparison } from '@/components/countries/comparison/CountryComparison';
import { CountriesTable } from '@/components/countries/table/CountriesTable';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [isComparisonVisible, setIsComparisonVisible] = useState(false);

  const { data, loading, error } = useQuery<{ countries: Country[] }>(ALL_COUNTRIES);

  if (loading) return <LoadingPage />;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  const filteredCountries = data?.countries?.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleCountrySelect = (country: Country) => {
    const isSelected = selectedCountries.find(c => c.name.common === country.name.common);
    
    if (isSelected) {
      // Remove the country if it's already selected
      const newSelectedCountries = selectedCountries.filter(c => c.name.common !== country.name.common);
      setSelectedCountries(newSelectedCountries);
      if (newSelectedCountries.length === 0) {
        handleCloseComparison();
      }
    } else if (selectedCountries.length < 2) {
      // Add the country if less than 2 are selected
      setSelectedCountries([...selectedCountries, country]);
      setIsComparisonVisible(true);
    } else {
      // If 2 countries are already selected, replace the second one
      setSelectedCountries([selectedCountries[0], country]);
    }
  };

  const handleCloseComparison = () => {
    setIsComparisonVisible(false);
    // Wait for the fade-out animation to complete before clearing the selection
    setTimeout(() => {
      setSelectedCountries([]);
    }, 300);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="sticky top-0 bg-white z-10 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-4xl font-bold mb-4">Countries Explorer</h1>
          
          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search countries..."
            />
          </div>

          {/* Country Comparison */}
          <CountryComparison
            isVisible={isComparisonVisible}
            countries={selectedCountries}
            onClose={handleCloseComparison}
            onRemoveCountry={handleCountrySelect}
          />
        </div>
      </div>

      {/* Countries Table */}
      <div className="container mx-auto px-4 py-4 flex-1">
        <CountriesTable
          countries={filteredCountries}
          selectedCountries={selectedCountries}
          onCountrySelect={handleCountrySelect}
        />
      </div>
    </main>
  );
}

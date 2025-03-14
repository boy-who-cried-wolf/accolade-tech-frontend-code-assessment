'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LoadingPage } from '@/components/ui/loading';
import { Country } from '@/types/country';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CountryDetail() {
  const router = useRouter();
  const params = useParams();
  const countryName = decodeURIComponent(params.name as string);

  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch country');
        }
        const data = await response.json();
        setCountry(data[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryName]);

  if (loading) return <LoadingPage />;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!country) return <div className="text-center">Country not found</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Countries
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="h-12 w-auto mr-4"
            />
            <h1 className="text-3xl font-bold">{country.name.common}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">General Information</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="font-medium text-gray-500">Official Name</dt>
                  <dd>{country.name.official}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Capital</dt>
                  <dd>{country.capital?.join(', ') || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Region</dt>
                  <dd>{country.region}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Subregion</dt>
                  <dd>{country.subregion || 'N/A'}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Demographics & Geography</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="font-medium text-gray-500">Population</dt>
                  <dd>{country.population.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Area</dt>
                  <dd>{country.area.toLocaleString()} km²</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Languages</dt>
                  <dd>
                    {Object.values(country.languages || {}).join(', ') || 'N/A'}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Currencies</dt>
                  <dd>
                    {Object.values(country.currencies || {})
                      .map(currency => `${currency.name} (${currency.symbol})`)
                      .join(', ') || 'N/A'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Bordering Countries</h2>
              <div className="flex flex-wrap gap-2">
                {country.borders.map(border => (
                  <span
                    key={border}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {border}
                  </span>
                ))}
              </div>
            </div>
          )}

          {country.maps?.googleMaps && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Maps</h2>
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                View on Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 
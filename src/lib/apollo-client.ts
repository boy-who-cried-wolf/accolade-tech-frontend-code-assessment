import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

// Create REST Link
const restLink = new RestLink({
  uri: 'https://restcountries.com/v3.1',
  endpoints: {
    countries: 'https://restcountries.com/v3.1'
  }
});

export const ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries 
    @rest(
      type: "CountriesResponse"
      path: "/all"
      endpoint: "countries"
    ) {
      name {
        common
        official
      }
      capital
      region
      subregion
      population
      area
      flags {
        png
        svg
      }
      currencies
      languages
      borders
      maps {
        googleMaps
      }
    }
  }
`;

export const GET_COUNTRY = gql`
  query GetCountry($name: String!) {
    country 
    @rest(
      type: "CountryResponse"
      path: "/name/{args.name}"
      endpoint: "countries"
    ) {
      name {
        common
        official
      }
      capital
      region
      subregion
      population
      area
      flags {
        png
        svg
      }
      currencies
      languages
      borders
      maps {
        googleMaps
      }
    }
  }
`;

export const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
}); 
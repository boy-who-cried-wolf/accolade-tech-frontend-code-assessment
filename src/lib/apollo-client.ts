import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { from } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://restcountries.com/v3',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 3000,
    jitter: true,
  },
  attempts: {
    max: 2,
    retryIf: (error) => !!error
  },
});

export const ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries @rest(type: "Country", path: "/all") {
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
    country @rest(type: "Country", path: "/name/{args.name}") {
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
  link: from([errorLink, retryLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
}); 
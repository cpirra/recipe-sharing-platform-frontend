import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT, // Using environment variable for GraphQL endpoint
  cache: new InMemoryCache()
});

export default client;
export { gql }; // Export gql from here

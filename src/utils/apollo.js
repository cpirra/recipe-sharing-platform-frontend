// src/utils/apollo.js
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core' // Import gql from core

const client = new ApolloClient({
  uri: 'https://localhost:7036/graphql/', // Your GraphQL endpoint
  cache: new InMemoryCache()
})

export default client
export { gql } // Export gql from here

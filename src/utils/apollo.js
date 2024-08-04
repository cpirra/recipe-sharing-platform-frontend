import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT, // Using environment variable for GraphQL endpoint
  cache: new InMemoryCache()
});

export default client;
export { gql }; // Export gql from here

export const fetchRecipeById = async (id) => {
  const GET_RECIPE_BY_ID = gql`
    query recipe {
      recipeById(id: ${id}) {
        description
        id
        imageUrls
        name
        videoUrls
        cuisineDetails {
          name
          id
        }
        categoryDetails {
          name
          id
        }
        ingredients {
          name
          quantity
        }
        instructions {
          description
          stepNumber
        }
        user {
          username
          id
        }
        nutritionalInfo {
          calories
          fat
          carbohydrates
          protein
          sugar
          fiber
          sodium
        }
      }
    }
  `;

  try {
    console.log('Fetching recipe with ID:', id);
    console.log('GraphQL Endpoint:', import.meta.env.VITE_GRAPHQL_ENDPOINT);
    const { data } = await client.query({
      query: GET_RECIPE_BY_ID,
      variables: { id: String(id) }, // Ensure id is a string
    });
    console.log('Received data:', data);
    return data.recipeById;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
};

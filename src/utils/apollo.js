import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

const client = new ApolloClient({
  uri: 'https://localhost:7036/graphql/', // Direct GraphQL endpoint URL
  cache: new InMemoryCache()
});

export default client;
export { gql }; // Export gql from here

export const fetchRecipeById = async (id) => {
  const GET_RECIPE_BY_ID = gql`
    query getRecipe {
      recipeById(id: ${id}) {
        description
        id
        imageUrls {
          url
        }
        name
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
  `

  try {
    const { data } = await client.query({
      query: GET_RECIPE_BY_ID
    })
    return data.recipeById
  } catch (error) {
    console.error('Error fetching recipe:', error)
    return null
  }
}
import VueJwtDecode from 'vue-jwt-decode'

/**
 * Function to decode the JWT token and extract user information
 * @returns {object|null} The decoded token or null if decoding fails
 */
export const getUserInfoFromToken = () => {
  const token = localStorage.getItem('token')

  if (token) {
    try {
      const decodedToken = VueJwtDecode.decode(token)
      return decodedToken
    } catch (error) {
      // Handle decoding errors, token tampering, or invalid tokens
      console.error('Error decoding token:', error)
      return null
    }
  } else {
    // Handle case where token is not present
    console.error('Token not found in local storage')
    return null
  }
}

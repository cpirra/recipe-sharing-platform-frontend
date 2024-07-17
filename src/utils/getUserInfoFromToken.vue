<script>
import jwtDecode from 'jwt-decode';

/**
 * @typedef {Object} DecodedToken
 * @property {string} userId
 * @property {string} userRole
 * @property {string} userName
 * // Add more properties as needed based on your token structure
 */

/**
 * Function to decode the JWT token and extract user information
 * @returns {DecodedToken|null} The decoded token or null if decoding fails
 */
export const getUserInfoFromToken = () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      // Handle decoding errors, token tampering, or invalid tokens
      console.error('Error decoding token:', error);
      return null;
    }
  } else {
    // Handle case where token is not present
    console.error('Token not found in local storage');
    return null;
  }
};
</script>

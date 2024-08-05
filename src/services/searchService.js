export async function fetchSearchResults(query) {
    const response = await fetch(`http://34.17.45.194:8080/api/Elastisearch/search?query=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('API Response:', data); // Add this line
    return data;
  }
  
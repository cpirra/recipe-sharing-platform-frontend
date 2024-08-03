// useSearch.js
import { ref, watch } from 'vue';

export function useSearch() {
  const searchQuery = ref('');
  const searchResults = ref([]);
  const showResults = ref(false);

  const fetchSearchResults = async () => {
    if (searchQuery.value.trim() === '') {
      searchResults.value = [];
      showResults.value = false;
      return;
    }

    const query = encodeURIComponent(searchQuery.value);
    try {
      const response = await fetch(`https://localhost:7036/api/Elastisearch/search?query=${query}`);
      const data = await response.json();
      searchResults.value = data;
      showResults.value = data.length > 0;
    } catch (error) {
      console.error('Error fetching search results:', error);
      searchResults.value = [];
      showResults.value = false;
    }
  };

  watch(searchQuery, fetchSearchResults);

  return { searchQuery, searchResults, showResults, fetchSearchResults };
}

import { ref, watch, computed } from 'vue';

// Use environment variables for the API base URL
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export function useSearch() {
  const searchQuery = ref('');
  const searchResults = ref([]);
  const showResults = ref(false);

  // Fetch search results from the API
  const fetchSearchResults = async () => {
    if (searchQuery.value.trim() === '') {
      searchResults.value = [];
      showResults.value = false;
      return;
    }

    const query = encodeURIComponent(searchQuery.value);
    try {
      const response = await fetch(`${apiBaseUrl}Elastisearch/search?query=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      searchResults.value = data;
      showResults.value = data.length > 0;
    } catch (error) {
      console.error('Error fetching search results:', error);
      searchResults.value = [];
      showResults.value = false;
    }
  };

  // Use debounce to limit the number of API calls
  let debounceTimeout;
  const debouncedFetch = (delay) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => fetchSearchResults(), delay);
  };

  watch(searchQuery, () => {
    debouncedFetch(300); // Debounce delay of 300ms
  });

  // Computed property to manage whether results are shown
  const resultsAvailable = computed(() => searchResults.value.length > 0);

  return { searchQuery, searchResults, showResults: resultsAvailable, fetchSearchResults };
}

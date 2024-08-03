import { ref } from 'vue';
import { fetchSearchResults } from '@/services/searchService.js';

const searchResults = ref([]);
const showSearchResults = ref(false);

const updateSearchResults = async (query) => {
  try {
    const results = await fetchSearchResults(query);
    searchResults.value = results;
    showSearchResults.value = results.length > 0;
  } catch (error) {
    console.error('Error updating search results:', error);
    showSearchResults.value = false;
  }
};

export function useSearchStore() {
  return {
    searchResults,
    showSearchResults,
    updateSearchResults
  };
}

<script setup>
import { ref, onMounted } from 'vue'
import { fetchReports } from '@/services/adminApi' // Import the fetchReports function

const reports = ref([])

const loadReports = async () => {
  reports.value = await fetchReports()
}

onMounted(() => {
  loadReports()
})
</script>

<template>
  <div class="admin-dashboard max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-bold mb-4">Admin Dashboard</h1>
    <div v-if="reports.length" class="report-list">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-50">Reporter ID</th>
            <th class="px-6 py-3 bg-gray-50">Recipe ID</th>
            <th class="px-6 py-3 bg-gray-50">Reason</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="report in reports" :key="report.id">
            <td class="px-6 py-4">{{ report.reporterId }}</td>
            <td class="px-6 py-4">{{ report.recipeId }}</td>
            <td class="px-6 py-4">{{ report.reason }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center text-gray-500">No reports available.</div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  max-width: 800px;
  margin: auto;
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 2rem;
}
</style>

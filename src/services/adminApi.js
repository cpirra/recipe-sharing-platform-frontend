const BASE_URL = 'https://localhost:7036/api'

const getToken = () => {
  return localStorage.getItem('auth_token')
}

const apiCall = async (endpoint, options = {}) => {
  const token = getToken()
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error during API call:', error)
    return null
  }
}

export const fetchReports = async () => {
  return await apiCall('/Reports')
}

export const approveReport = async (id) => {
  return await apiCall(`/Reports/${id}/approve`, {
    method: 'POST'
  })
}

export const rejectReport = async (id) => {
  return await apiCall(`/Reports/${id}/reject`, {
    method: 'POST'
  })
}

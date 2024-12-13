import axiosInstance from "./axiosInstance"

export const getBoulderById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/boulders/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching crag:', error)
    throw error 
  }
}

export const getBouldersByCragId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/boulders/crag/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching crags:', error)
    throw error    
  }
}
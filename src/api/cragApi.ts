import axiosInstance from "./axiosInstance";

export const getCrags = async () => {
  try {
    const response = await axiosInstance.get('/crags')
    return response.data
  } catch (error) {
    console.error('Error fetching crags:', error)
    throw error    
  }
}
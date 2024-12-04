import axiosInstance from "./axiosInstance"

export const getBouldersByCragId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/boulders/crag/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching crags:', error)
    throw error    
  }
}
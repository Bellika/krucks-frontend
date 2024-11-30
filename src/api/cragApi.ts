import axiosInstance from "./axiosInstance";

export const getCragById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/crags/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching crag:', error)
    throw error   
  }
}

export const getCrags = async () => {
  try {
    const response = await axiosInstance.get('/crags')
    return response.data
  } catch (error) {
    console.error('Error fetching crags:', error)
    throw error    
  }
}
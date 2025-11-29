import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface TextToJSXResponse {
  jsx_code: string
  component_name: string
  success: boolean
  message?: string
}

export interface ImageToJSXResponse {
  jsx_code: string
  component_name: string
  success: boolean
  message?: string
}

export const generateFromText = async (text: string): Promise<TextToJSXResponse> => {
  const response = await apiClient.post<TextToJSXResponse>('/api/generate/text', {
    text_description: text,
  })
  return response.data
}

export const generateFromImage = async (file: File): Promise<ImageToJSXResponse> => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await apiClient.post<ImageToJSXResponse>('/api/generate/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}


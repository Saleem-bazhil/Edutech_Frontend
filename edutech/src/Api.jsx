import axios from "axios"

export const BASE_URL = "http://localhost:8000/api/v1"

const api = axios.create({
    baseURL:BASE_URL
})

export default api
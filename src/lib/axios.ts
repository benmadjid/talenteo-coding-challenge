import Axios from "axios"
const API_URL = import.meta.env.VITE_API_URL
if (!API_URL) {
    throw new Error("An API url must be provided to start the app")
}
const axios = Axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
})
axios.interceptors.request.use((config) => {
    return config
})
axios.interceptors.response.use((config) => {
    return config
})
export default axios
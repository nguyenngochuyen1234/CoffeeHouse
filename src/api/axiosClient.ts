import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { STATIC_HOST } from "../common"

const axiosClient = axios.create({
  baseURL: `${STATIC_HOST}`,
  headers: {
    "Content-Type": "application/json",
  },
})
// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: { data: any }) {
    console.log({response})
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data
  },
  function (error) {
    console.log({error})
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)

export default axiosClient

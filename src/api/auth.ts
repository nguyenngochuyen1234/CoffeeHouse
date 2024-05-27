import { menu, user } from "@/models"
import axiosClient from "./axiosClient"
const authApi = {
  register(data: user) {
    const url = `api/auth/register`
    return axiosClient.post(url, data)
  },
  login(data: {
    User_Name: string,
    User_Password: string
  }) {
    const url = `api/auth/login`
    return axiosClient.post(url, data)
  },
  getUser() {
    const url = `api/auth/user`
    return axiosClient.get(url)
  },
  getAllUser() {
    const url = `api/auth/getAll`
    return axiosClient.get(url)
  },
  logout() {
    const url = `api/auth/logout`
    return axiosClient.get(url)
  },
  adminOnly() {
    const url = `api/auth/admin_only`
    return axiosClient.get(url)
  }
}
export default authApi
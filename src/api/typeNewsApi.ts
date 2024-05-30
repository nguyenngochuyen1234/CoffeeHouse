import axiosClient from "./axiosClient"
import { typeNews } from "@/models"
const typeNewsApi = {
  getAllTypeNews() {
    const url = "api/typenews"
    return axiosClient.get(url)
  },
  AddTypeNews(data: typeNews) {
    const url = "api/typenews"
    return axiosClient.post(url, data)
  },
  UpdateTypeNews(data: typeNews) {
    const url = `api/typenews/${data.TypeNews_ID}`
    return axiosClient.put(url, data)
  },
  deleteTypeNews(id: number) {
    const url = `api/typenews/${id}`
    return axiosClient.delete(url)
  }
}
export default typeNewsApi
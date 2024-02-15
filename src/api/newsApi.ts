import axiosClient from "./axiosClient"
import { news } from "@/models"
const newsApi={
  getAllNews(){
    const url="api/news"
    return axiosClient.get(url)
  },
  AddNews(data:news){
    const url="api/news"
    return axiosClient.post(url, data)
  }
}
export default newsApi
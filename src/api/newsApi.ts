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
  },
  getNews(id:string) {
    const url = `api/news/getNews/${id}`
    return axiosClient.get(url)
  }
}
export default newsApi
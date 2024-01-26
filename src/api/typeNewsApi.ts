import axiosClient from "./axiosClient"
import { typeNews } from "@/models"
const typeNewsApi={
  getAllTypeNews(){
    const url="api/typeNews"
    return axiosClient.get(url)
  },
  AddTypeNews(data:typeNews){
    const url="api/typeNews"
    return axiosClient.post(url, data)
  },
  deleteTypeNews(id:number){
    const url=`api/typeNews/${id}`
    return axiosClient.delete(url)
  }
}
export default typeNewsApi
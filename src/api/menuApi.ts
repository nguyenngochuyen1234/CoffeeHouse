import { menu } from "@/models"
import axiosClient from "./axiosClient"
const menuApi={
  getAllmenu(){
    const url="api/menu"
    return axiosClient.get(url)
  },
  addMenu(data:menu){
    const url="api/menu"
    return axiosClient.post(url, data)
  }, 
  updateMenu(data:menu){
    const url=`api/menu`
    return axiosClient.put(url, data)
  },
  deleteMenu(id:string){
    const url=`api/menu/${id}`
    return axiosClient.delete(url)
  },
  getMenuById(id:string){
    const url=`api/menu/${id}`
    return axiosClient.get(url)
  }
}
export default menuApi
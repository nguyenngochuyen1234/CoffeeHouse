import axiosClient from "./axiosClient"
import { typeProducts } from "@/models"
const typeProductsApi={
  getAllTypeProduct(){
    const url="api/typeProduct"
    return axiosClient.get(url)
  },
  addTypeProduct(data:typeProducts){
    const url="api/typeProduct"
    return axiosClient.post(url, data)
  }, 
  updateTypeProduct(data:typeProducts){
    const url=`api/typeProduct`
    return axiosClient.put(url, data)
  },
  deleteTypeProduct(id:string){
    const url=`api/typeProduct/${id}`
    return axiosClient.delete(url)
  }
}
export default typeProductsApi
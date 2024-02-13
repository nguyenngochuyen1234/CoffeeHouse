import axiosClient from "./axiosClient"
import { products } from "@/models"
const productsApi={
  getAllProduct(){
    const url="api/products"
    return axiosClient.get(url)
  },
  addProduct(data:products){
    const url="api/products"
    return axiosClient.post(url, data)
  },
  updateProduct(data:products){
    const url=`api/products/${data.Product_ID}`
    return axiosClient.put(url, data)
  },
  detailProduct(id:number){
    const url=`api/products/${id}`
    return axiosClient.get(url)
  },
  deleteProduct(id:number){
    const url=`api/products/${id}`
    return axiosClient.delete(url)
  }
}
export default productsApi
import axiosClient from "./axiosClient"
import { products } from "@/models"
const productsApi={
  getAllProduct(){
    const url="api/product"
    return axiosClient.get(url)
  },
  addProduct(data:products){
    const url="api/product"
    return axiosClient.post(url, data)
  },
  updateProduct(data:products){
    const url=`api/product`
    return axiosClient.put(url, data)
  },
  // detailProduct(id:number){
  //   const url=`api/product/${id}`
  //   return axiosClient.get(url)
  // },
  deleteProduct(id:number){
    const url=`api/product/${id}`
    return axiosClient.delete(url)
  }
}
export default productsApi
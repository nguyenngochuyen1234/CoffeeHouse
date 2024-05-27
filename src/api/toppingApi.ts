import { topping } from "@/models/topping"
import axiosClient from "./axiosClient"
const toppingApi = {
  getToppingById(id: string) {
    const url = `api/topping/${id}`
    return axiosClient.get(url)
  },
  getAllTopping() {
    const url = "api/topping"
    return axiosClient.get(url)
  },
  getProductTopping(idProduct:string) {
    const url = "api/get_product_topping"
    return axiosClient.post(url, {idProduct})
  },
  addTopping(data: topping) {
    const url = "api/topping"
    return axiosClient.post(url, data)
  },
  updateTopping(id: string, data: topping) {
    const url = `api/topping/${id}`
    return axiosClient.put(url, data)
  },
  deleteTopping(id: string) {
    const url = `api/topping/${id}`
    return axiosClient.delete(url)
  },
  productTopping(data: {
    Topping_ID: string
    idProduct: string
  }) {
    const url = `api/product_topping`
    return axiosClient.post(url, data)
  }
}
export default toppingApi
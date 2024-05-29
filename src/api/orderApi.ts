import { orderDetails } from "@/models/order"
import axiosClient from "./axiosClient"
import { typeNews } from "@/models"
const orderApi = {
  getAllOrders() {
    const url = "api/get_order_details"
    return axiosClient.get(url)
  },
  AddOrder(data: orderDetails) {
    const url = "api/add_order"
    return axiosClient.post(url, data)
  },
  getOrderDetailsProduct(idProduct: string) {
    const url = `api/get_order_detail_product/${idProduct}`
    return axiosClient.get(url)
  },
  getAllOrderDetails() {
    const url = `api/get_all_order_details`
    return axiosClient.get(url)
  },
  deleteOrderDetail(id: string) {
    const url = `api/delete_order_detail/${id}`
    return axiosClient.delete(url)
  },
  deleteOrder(id: string) {
    const url = `api/delete_order/${id}`
    return axiosClient.delete(url)
  },
  updateOrderProduct(id: string, dataUpdate: orderDetails) {
    const url = `api/update_order_detail/${id}`
    return axiosClient.put(url, dataUpdate)
  },
  updateOrderStatus(id: string, status: string) {
    const url = `api/update_order_status/${id}`
    return axiosClient.put(url, {
      Order_Status:status
    })
  }
}
export default orderApi
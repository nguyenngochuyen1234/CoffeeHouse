import { Col, Image, Row } from "antd"
import CardComponent from "../../components/CardComponent"
import banner1 from '@/assets/images/banner1.webp'
import { useEffect, useState } from "react"
import productsApi from "@/api/productsApi"
import { products } from "@/models"
const MenuList = () => {
  const [products, setProducts] = useState<products[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productsApi.getAllProduct()
        if (response.data) {
          let data = response.data.slice(0,5)
          setProducts(data)
          console.log(data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="px-8 py-8 flex flex-wrap gap-4 justify-center">
      <Image src={banner1} className="rounded-lg shadow-2xl max-w-[633px] max-h-auto ml-4" alt="banner" preview={false} />
      {products.map(item => <CardComponent item={item} />)}

    </div>
  )
}

export default MenuList

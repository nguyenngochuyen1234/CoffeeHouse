import { Col, Image, Row } from "antd"
import CardComponent from "../../components/CardComponent"
import banner1 from '../../assets/banner1.webp'
const MenuList = () => {
  return (
    <div className="px-8 py-8 flex flex-wrap gap-4 justify-center">
      <Image src={banner1} className="rounded-lg shadow-2xl max-w-[633px] max-h-auto ml-4" alt="banner" preview={false}/>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
    </div>
  )
}

export default MenuList

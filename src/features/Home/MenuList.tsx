import { Col, Image, Row } from "antd"
import CardComponent from "../../components/CardComponent"
import banner1 from '../../assets/banner1.webp'
{/* <Row>
        <Col span={12}>
          <Image src={banner1} className="rounded-lg shadow-2xl max-w-[600px] max-h-auto ml-4" alt="banner" preview={false}/>
        </Col>
        <Col span={6}>
          <CardComponent/>
        </Col>
        <Col span={6}>
          <CardComponent/>
        </Col>
      </Row>

      <Row>
        <Col span={6}>
          <CardComponent/>
        </Col>
        <Col span={6}>
          <CardComponent/>
        </Col>
        <Col span={6}>
          <CardComponent/>
        </Col>
        <Col span={6}>
          <CardComponent/>
        </Col>
      </Row> */}
const MenuList = () => {
  return (
    <div className="px-8 py-8 flex flex-wrap gap-4 justify-center">
      <Image src={banner1} className="rounded-lg shadow-2xl max-w-[600px] max-h-auto ml-4" alt="banner" preview={false}/>
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

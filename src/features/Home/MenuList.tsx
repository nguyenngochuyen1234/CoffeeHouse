import { Col, Image, Row } from "antd"
import CardComponent from "../../components/CardComponent"
import banner1 from '../../assets/banner1.webp'
const MenuList = () => {
  return (
    <div className="px-8 py-8">
      <Row>
        <Col span={12}>
          <Image src={banner1} className="rounded-lg shadow-2xl max-w-[570px] max-h-auto ml-4" alt="banner" preview={false}/>
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
      </Row>
    </div>
  )
}

export default MenuList
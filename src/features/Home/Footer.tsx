import { EnvironmentOutlined, FacebookOutlined, InstagramOutlined, PhoneOutlined } from "@ant-design/icons"
import { Col, Divider, Image, Row } from "antd"
import Slider1 from '../../assets/desktop_9c03e90bd535442e9ac18d23fc551cb6.webp'

const Footer = () => {
  return (
    <div className='w-[100%] bg-[#000000D9] h-[450px] pt-8 pb-12 px-8 text-white'>
      <Row>
        <Col span={6}>
          <p className="text-[16px] font-semibold mb-[16px]">Giới thiệu</p>
          <div className="text-[12px] mb-[8px]">
          <p>Về chúng tôi</p>
          <p>Sản phẩm</p>
          <p>Khuyến mại</p>
          <p>Chuyện cà phê</p>
          <p>Cửa hàng </p>
          <p>Tuyển dụng</p>
          </div>
        </Col>
        <Col span={6}>
          <p className="text-[16px] font-semibold mb-[16px]">Điều khoản</p>
          <div className="text-[12px] mb-[8px]">
          <p>Điều khoản sử dụng</p>
          <p>Chính sách bảo mật thông tin</p>
          <p>Hướng dẫn sử dụng hóa đơn GTGT</p> 
          </div>
        </Col>
        <Col span={6}>
          <div className="mb-6"><PhoneOutlined className="mr-2 text-xl"/> <span className="text-[16px] font-semibold">Đặt hàng: 1800 999</span></div>
          <div className="mb-6"><EnvironmentOutlined className="mr-2 text-xl"/> <span className="text-[16px] font-semibold">Liên hệ</span></div>
          <span>Tầng 3-4 Hub Building <br />
                195/10E Điện Biên Phủ, P.15, <br />
                Q.Bình Thạnh, TP.Hồ Chí Minh
          </span>
        </Col>
        <Col span={6}>
            <div>
              <Image src={Slider1} alt="banner" preview={false}/>
            </div>
            <div className="mt-5 mb-2.5">
              <span><FacebookOutlined className="text-2xl mr-4"/></span>
              <span><InstagramOutlined className="text-2xl"/></span>
            </div>
        </Col>
      </Row>
      <Divider className="bg-white"/>
        <div className="text-white text-xs">
          <span>Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN</span><br />
          <span>Mã số DN: 0312867172 do sở kế hoạch và đầu tư tp. HCM cấp ngày 23/07/2014. Người đại diện: NGÔ NGUYÊN KHA</span><br />
          <span>Địa chỉ: 86-88 Cao Thắng, phường 04, quận 3, tp Hồ Chí Minh   Điện thoại: (028) 7107 8079   Email: hi@thecoffeehouse.vn</span><br />
          <span>© 2014-2022 Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN mọi quyền bảo lưu</span>
        </div>
    </div>
  )
}
export default Footer
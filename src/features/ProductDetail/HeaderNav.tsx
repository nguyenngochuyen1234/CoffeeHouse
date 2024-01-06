import { Col, Row } from 'antd'

const HeaderNav = () => {
  return (
    <div className='px-10 py-5 items-center  border-b border-solid border-[#00000026] opacity-[86%] bg-gradient-to-r from-orange-400 to-orange-500 w-[100%] h-[70px] fixed top-0 left-0 z-10 flex-nowrap'>
      <Row>
        <Col span={6} offset={1}>
          <span className='text-left text-lg font-bold cursor-pointer text-white'>THE COFFEE TLU</span>
        </Col>
        <Col span={12} offset={1}>
          <span className='text-left text-lg font-semibold mr-7 cursor-pointer text-white'>Cà phê</span>
        </Col>
      </Row>
    </div>
  )
}

export default HeaderNav
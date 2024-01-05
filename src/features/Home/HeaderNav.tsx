import { Col, Row } from 'antd'

const HeaderNav = () => {
  return (
    <div className='px-10 py-3 items-center border-b border-solid border-[#00000026] h-[60px] opacity-80 bg-[#fff] w-[100%] fixed top-0 left-0 z-10 flex-nowrap'>
      <Row>
        <Col span={5}>
          <span className='text-left text-xl font-bold'>THE COFFEE TLU</span>
        </Col>
        <Col span={19}>
          <span className='text-left text-lg font-semibold mr-7'>Cà phê</span>
          <span className='text-left text-lg font-semibold mr-7'>Cà phê</span>
          <span className='text-left text-lg font-semibold mr-7'>Cà phê</span>
        </Col>
      </Row>
    </div>
  )
}

export default HeaderNav
import { Col, Row } from 'antd'

const HeaderNav = () => {
  return (
    <div className='px-10 py-3.5 items-center border-b border-solid border-[#00000026] opacity-80 h-[60px] bg-white w-[100%] fixed top-0 left-0 z-10 flex-nowrap'>
      <Row>
        <Col span={5}>
          <span className='text-left text-xl font-bold cursor-pointer'>THE COFFEE TLU</span>
        </Col>
        <Col span={19} className='flex justify-start items-center'>
          <span className='text-left text-sm font-semibold mr-7 cursor-pointer'>Cà phê</span>
          <span className='text-left text-sm font-semibold mr-7 cursor-pointer'>Trà ô long</span>
          <span className='text-left text-sm font-semibold mr-7 cursor-pointer'>Trà sữa</span>
        </Col>
      </Row>
    </div>
  )
}

export default HeaderNav
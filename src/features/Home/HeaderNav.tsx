import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, ShoppingOutlined } from '@ant-design/icons'
import { useAuth } from '@/AuthContext'
import { Button, Dropdown, Badge } from 'antd'
import type { MenuProps } from 'antd';
import { Link } from "react-router-dom";
import authApi from '@/api/auth'
const HeaderNav = () => {
  const { auth, orderDetails } = useAuth()
  let navigate = useNavigate()
  const handleLogout = async () => {
    try{
      await authApi.logout()
      localStorage.clear()
      window.location.reload(); 
    }catch(err){

    }
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to='/updateUser'>Quản lý người dùng</Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to='/orders'>Đơn hàng</Link>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" onClick={handleLogout}>
          Đăng xuất
        </a>
      ),
    },
  ];

  return (
    <div className='px-10 py-3.5 items-center border-b border-solid border-[#00000026] opacity-80 h-[60px] bg-white w-[100%] fixed top-0 left-0 z-10 flex-nowrap'>
      <Row>
        <Col span={5}>
          <span className='text-left text-xl font-bold cursor-pointer' onClick={() => navigate('/')}>THE COFFEE TLU</span>
        </Col>
        <Col span={17} className='flex justify-start items-center'>
          <span className='text-left text14-bold font-semibold mr-7 cursor-pointer' onClick={() => navigate('/collections/all')}>Menu</span>
          <span className='text-left text14-bold font-semibold mr-7 cursor-pointer'>Cà phê</span>
          <span className='text-left text14-bold font-semibold mr-7 cursor-pointer'>Trà ô long</span>
          <span className='text-left text14-bold font-semibold mr-7 cursor-pointer'>Trà sữa</span>
        </Col>
        <Col span={2} className='flex justify-end items-center gap-4'>
          {auth ? <> <Dropdown menu={{ items }} placement="topRight" arrow>
            <Button size='large' shape="circle" icon={<UserOutlined />} />
          </Dropdown>
            <Badge count={orderDetails.length}>
              <Button size='large' type={orderDetails.length > 0 ? `primary` : 'default'} shape="circle" icon={<ShoppingOutlined />} onClick={() => navigate('/checkout')} />
            </Badge>
          </> : <>
            <Button style={{ border: 'none' }} onClick={() => navigate('/register')}>Đăng ký</Button>
            <Button style={{ border: 'none' }} onClick={() => navigate('/login')}>Đăng nhập</Button>
          </>}
        </Col>
      </Row>
    </div>
  )
}

export default HeaderNav
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ScheduleOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}



const items: MenuItem[] = [
  getItem('Sản phẩm', 'product', <ShoppingOutlined />, [
    getItem('Quản lý loại sản phẩm', 'manageTypeProduct'),
    getItem('Quản lý menu loại sản phẩm', 'manageMenuProduct'),
    getItem('Quản lý sản phẩm', 'manageProduct'),
    getItem('Quản lý topping', 'manageTopping'),
  ]),

  getItem('Tin tức', 'news', <ScheduleOutlined />, [
    getItem('Quản lý loại tin tức', 'manageTypeNews'),
    getItem('Quản lý tin tức', 'manageNews'),
  ]),
  getItem('Quản lý đơn hàng', 'manageOrders'),
  getItem('Quản lý người dùng', 'manageUser'),
];

const App: React.FC = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<string>(''); // State để lưu trữ ID của menu được chọn

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (selectedMenuId == "manageTypeProduct") {
      navigate('typeProduct')
    } else if (selectedMenuId == "manageProduct") {
      navigate('product')


    } else if (selectedMenuId == "manageTypeNews") {
      navigate('typeNews')


    } else if (selectedMenuId == "manageNews") {
      navigate('news')

    } else if (selectedMenuId == "manageMenuProduct") {
      navigate('menu')
    } else if (selectedMenuId == "manageTopping") {
      navigate('topping')
    } else if (selectedMenuId == "manageOrders") {
      navigate('orders')
    } else if (selectedMenuId == "manageUser") {
      navigate('users')
    }
  }, [selectedMenuId])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline" items={items}
          onSelect={(item) => {
            setSelectedMenuId(item.key.toString());
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Coffee TLU ©{new Date().getFullYear()} Created by group 1
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
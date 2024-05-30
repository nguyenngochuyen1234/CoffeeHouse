import { Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Admin from "./pages/Admin";
import TypeNews from "./features/Admin/TypeNews";
import News from "./features/Admin/News";
import TypeProduct from "./features/Admin/TypeProduct";
import Product from "./features/Admin/Product";
import BlogDetail from "./pages/BlogDetail";
import BodyHome from "./pages/BodyHome";
import Blogs from "./pages/Blogs";
import ProductPage from "./features/Home/ProductPage";
import TypeProductPage from "./features/ProductDetail/TypeProduct";
import Checkout from "./features/Home/Checkout";
import { Button, ConfigProvider, Space } from 'antd';
import Menu from "./features/Admin/Menu";
import Collections from "./pages/Collections";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./AuthContext";
import Topping from "./features/Admin/Topping";
import UpdateUser from "./pages/UpdateUser";
import Orders from "./pages/Orders";
import PrivateRouteUser from "./routes/PrivateRouteUser";
import OrdersAdmin from "./features/Admin/Orders";
import Users from "./features/Admin/Users";
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#faa515',
          // colorIcon: '#faa515',
          fontSize: 14,
        },
      }}
    >
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<BodyHome />} />
            <Route path="blogs/:typeNews/:idNews" element={<BlogDetail />} />
            <Route path="blogs/:typeNews" element={<Blogs />} />
            <Route path="products/:idProduct" element={<ProductPage />} />
            <Route path="/product-detail" element={<TypeProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path='/collections/:idMenu' element={<Collections />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/updateUser' element={<UpdateUser />} />
            <Route path='/orders' element={<Orders />} />
          </Route>
          <Route path="/admin" element={<PrivateRouteUser component={Admin} role="admin" />}>
            <Route path='typeProduct' element={<TypeProduct />} />
            <Route path='product' element={<Product />} />
            <Route path='typeNews' element={<TypeNews />} />
            <Route path='news' element={<News />} />
            <Route path='menu' element={<Menu />} />
            <Route path='topping' element={<Topping />} />
            <Route path='orders' element={<OrdersAdmin />} />
            <Route path='users' element={<Users />} />
          </Route>

        </Routes>
      </AuthProvider>
    </ConfigProvider>

  )
}
export default App

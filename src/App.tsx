import { Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Admin from "./pages/Admin";
import TypeNews from "./features/Admin/TypeNews";
import News from "./features/Admin/News";
import TypeProduct from "./features/Admin/TypeProduct";
import Product from "./features/Admin/Product";
import ProductDetailPage from "./pages/ProductDetailPage";
import BlogDetail from "./pages/BlogDetail";
import BodyHome from "./pages/BodyHome";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<BodyHome />} />
        <Route path="blogs/:typeNews/:idNews" element={<BlogDetail />} />
      </Route>
      <Route path="/admin" element={<Admin />}>
        <Route path='typeProduct' element={<TypeProduct />} />
        <Route path='product' element={<Product />} />
        <Route path='typeNews' element={<TypeNews />} />
        <Route path='news' element={<News />} />
      </Route>

      <Route path="/product-detail" element={<ProductDetailPage />} />
    </Routes>
  )
}
export default App

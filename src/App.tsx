import { Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Admin from "./pages/Admin";
import TypeNews from "./features/Admin/TypeNews";
import News from "./features/Admin/News";
import TypeProduct from "./features/Admin/TypeProduct";
import Product from "./features/Admin/Product";
function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />}>
        <Route path='typeProduct' element={<TypeProduct />} />
        <Route path='product' element={<Product />} />
        <Route path='typeNews' element={<TypeNews />} />
        <Route path='news' element={<News />} />
      </Route>
    </Routes>
  )
}

export default App

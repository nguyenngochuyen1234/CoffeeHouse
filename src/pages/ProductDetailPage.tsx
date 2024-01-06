import Footer from "../../src/features/ProductDetail/Footer"
import HeaderNav from "../../src/features/ProductDetail/HeaderNav"
import TypeProduct from "../../src/features/ProductDetail/TypeProduct"
export interface ProductDetailPage {}
const ProductDetailPage = (props: ProductDetailPage)=>{
    return (
        <>
            <HeaderNav />
            <TypeProduct/>
            <Footer/>
        </>
    )
}

export default ProductDetailPage
import typeProductsApi from '@/api/typeProductsApi';
import CardProductComponent from '@/components/ProductDetail/CardProductComponent';
import CardTypeProductComponent from '@/components/ProductDetail/CardTypeProductComponent';
import ProductInfomation from '@/components/ProductDetail/ProductInfomation';
import SearchProduct from '@/components/ProductDetail/SearchProduct';
import { products, typeProducts } from '@/models';
import { SearchOutlined, TrophyFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TypeProductPage = () => { 
    const [showInfoProduct,setShowInfoProduct]=useState(false);
    const [productInfo, setProducInfo] = useState<products | null>(null)
    const navigate = useNavigate()
    const [showSearchModal,setShowSearchModal]=useState(false);
    const [typeProducts, setTypeProducts] = useState<typeProducts[]>([])
    const [products, setProducts] = useState<products[]>([])

    const handleClickClose =()=>{
        setShowInfoProduct(false);
    }
    const handleClickCloseSearchModal =()=>{
        setShowSearchModal(false);
    }
    const handleClickProduct = (products:products) => {
        setShowInfoProduct(true)
        setShowSearchModal(false)
        setProducInfo(products)
        navigate(`/products/${products.idProduct}`)
    }

    useEffect(()=>{
        const fectchData = async () => {
            try{
                let response = await typeProductsApi.getAllTypeProduct()
                if(response.data){
                    setTypeProducts(response.data)
                }
            }catch(err){
                console.log(err)
            }
        }
        fectchData()
    },[])
    return (
        <>
        <div  className='min-h-[900px] mx-44 mt-[130px] mb-[120px]'>
            <div className='ml-1.5'>
                <div className='flex justify-center'>
                    <span> <TrophyFilled className='text-2xl text-[#faa515] mb-2'/> 
                        <span className='text-3xl'> Sản phẩm từ Nhà</span> 
                    </span>
                    <span onClick={()=>setShowSearchModal(true)} className='ml-2 rounded-xl bg-[#e3e3e3] w-8 h-8'><SearchOutlined className='mt-1 ml-1 text-2xl font-bold text-[#838387]'/></span>   
                </div>
               <div className='flex justify-center flex-wrap mt-10'>
                    {typeProducts?.map(item=> <CardTypeProductComponent key={item.TypeProduct_Name} TypeProduct_Name={item.TypeProduct_Name} TypeProduct_Img={item.TypeProduct_Img} TypeProduct_ID={item.TypeProduct_ID} setProducts={setProducts} products={products}/>)}

               </div>
               <div className='flex flex-wrap gap-[37px] items-center mt-10'>
                    {products.map(item => <CardProductComponent key={item.idProduct} productData={item} setShow={setShowInfoProduct} setProducInfo={setProducInfo}/>)}
               </div>
            </div>
        </div>
        {showInfoProduct && productInfo && <ProductInfomation  onClose={handleClickClose} idProduct={productInfo.idProduct} />}
        {showSearchModal && <SearchProduct onClose={handleClickCloseSearchModal} handleClickProduct={handleClickProduct}/>}
        </>
    );
};

export default TypeProductPage;

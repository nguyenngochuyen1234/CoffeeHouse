import productsApi from '@/api/productsApi';
import { products } from '@/models';
import { CloseOutlined, MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import { Input, Row, Col } from 'antd'
import { useState } from 'react';
export interface SearchProductProps {
    onClose: () => void
    handleClickProduct: (products:products) => void
}
export interface ProductItemProps {
    productData: products
    handleClickProduct: (products:products) => void
}

const { Search } = Input;

const ProductItem: React.FC<ProductItemProps> = ({ productData,handleClickProduct }) => {
    return (
        <div className=' shadow-2xl w-[350px] rounded-lg flex flex-row gap-3 bg-white p-2 cursor-poiter' onClick={()=>handleClickProduct(productData)}>
            <img src={productData.Product_Image} alt='product_1' className='w-[100px] h-[100px] rounded-lg' />
            <div className='pt-1 flex flex-col justify-between'>
                <div className='text-[#262626] text-base font-semibold overflow-hidden'>{productData.Product_Name}</div>
                <div className='pt-4'>
                    <span className='text-base opacity-90 mt-2'>{productData.Product_Price} đ</span>
                </div>
            </div>
        </div>
    )
}

const SearchProduct: React.FC<SearchProductProps> = ({ onClose, handleClickProduct }) => {

    const [productsSearch, setProductsSearch] = useState<products[]>([])

    const handleOnChange = async (e: any) => {
        try {
            let value = e.target.value
            if(value){
                const response = await productsApi.getProductBySearch(value)
                if (response.data) {
                    setProductsSearch(response.data)
                }
            }else{
                setProductsSearch([])
            }
        } catch (err) {
            console.log({ err })
        }
    }
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50' style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
            <div className='bg-white w-[750px] rounded-md overflow-y-scroll relative'>
                <div className='flex items-center justify-center p-4'>
                    <CloseOutlined className='text-xl opacity-50 absolute left-4' onClick={() => onClose()} />
                    <b className='text-sm px-24'>Tìm kiếm</b>
                </div>
                <hr />

                <div className='p-3'>
                    <Search placeholder="input search text" onChange={handleOnChange} style={{ width: '100%' }} />
                    <div className='max-h-[500px]'>
                        <Row gutter={[16, 16]}>
                            {productsSearch.map(item => (
                                <Col key={item.idProduct} span={12}>
                                    <ProductItem productData={item} handleClickProduct={handleClickProduct}/>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchProduct;
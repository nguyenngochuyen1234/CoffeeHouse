import { CloseOutlined, MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import { Image } from 'antd';
import { products } from '@/models';

export interface ProductInfomationProps {
    onClose: () => void
    productInfo: products
}

const ProductInfomation: React.FC<ProductInfomationProps> = ({ onClose, productInfo }) => {

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50' style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
            <div className='bg-white w-[410px] h-[500px] rounded-md overflow-y-scroll'>
                <div className='flex items-center justify-center p-4'>
                    <CloseOutlined className='text-xl opacity-50' onClick={() => onClose()} />
                    <b className='text15-bold px-24'>Thông tin sản phẩm</b>
                </div>
                <hr />
                <div className='p-4'>
                    <Image src={productInfo.Product_Image} alt='product_1' preview={false} className='rounded-md' />
                    <div className='mt-0.5 px-1'>
                        <h1 className='text-lg font-medium'>{productInfo.Product_Name}</h1>
                        <p className='text-sm text-[#666666] mt-2 leading-6 tracking-wide flex flex-col text-justify'>{productInfo.Product_Description}</p>
                    </div>
                </div>

                <div className='p-3'>
                    <button className='flex justify-center w-full rounded-2xl text-white bg-gradient-to-r from-orange-400 to-orange-500'>
                        {(productInfo.Product_Price)}đ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfomation;
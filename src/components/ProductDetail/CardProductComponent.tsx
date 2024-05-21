import { Image } from 'antd';
import React from 'react';
import product_1 from '../../assets/product_1.webp'
import { PlusCircleFilled } from '@ant-design/icons';
import { products } from '@/models';
import { useNavigate } from 'react-router-dom';
export interface CardProductComponentProps {
    productData: products
    setProducInfo: React.Dispatch<React.SetStateAction<products | null>>
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}


const CardProductComponent: React.FC<CardProductComponentProps> = ({ productData, setProducInfo, setShow }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        setProducInfo(productData)
        setShow(true)
        // navigate(`/products/${productData.idProduct}`)
    }
    return (
        <div className=' shadow-2xl rounded-lg bg-white p-2 cursor-poiter' onClick={handleClick}>
            <img src={productData.Product_Image} alt='product_1'className='w-[150px] h-[150px] rounded-lg' />
            <div className='pt-1'>
                <div className='text-[#262626] text-sm font-semibold max-w-[150px] overflow-hidden'>{productData.Product_Name}</div>
                <div className='pt-4 flex justify-between'>
                    <span className='text-sm opacity-90 mt-2'>{productData.Product_Price}</span>
                    <span><PlusCircleFilled className='text-[#FA8C16] text-3xl' /></span>
                </div>
            </div>
        </div>

    );
};

export default CardProductComponent;

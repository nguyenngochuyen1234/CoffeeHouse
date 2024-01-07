import { Image } from 'antd';
import React from 'react';
import product_1 from '../assets/product_1.webp'
import { PlusCircleFilled } from '@ant-design/icons';


const CardProductComponent = () => {
    return (
        <div className='w-[135px] h-60 shadow-xl rounded-lg bg-white p-2'>
            <div><Image src={product_1} alt='product_1' preview={false} className='w-24 h-24 rounded-lg'/></div>
            <div className='pt-1'>
                <div className='text-[#262626] text-sm font-semibold overflow-hidden'>Trà Xanh Latte (Nóng)</div>
                <div className='pt-6 flex justify-center gap-8 '>
                    <span className='text-sm opacity-90 mt-2'>45.000đ</span>
                    <span><PlusCircleFilled className='text-[#FA8C16] text-3xl'/></span>
                </div>
            </div>
        </div>
    );
};

export default CardProductComponent;

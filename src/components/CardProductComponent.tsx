import { Image } from 'antd';
import React from 'react';
import product_1 from '../assets/product_1.webp'


const CardProductComponent = () => {
    return (
        <div className='w-28 h-52 shadow-xl rounded-lg bg-white p-2'>
            <div><Image src={product_1} alt='product_1' preview={false} className='w-24 h-24 rounded-lg'/></div>
        </div>
    );
};

export default CardProductComponent;

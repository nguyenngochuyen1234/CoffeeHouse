import React from 'react';
import TypeProduct_img1 from '../assets/type_product/tra_sua.png'
const CardTypeProductComponent = () => {
    return (
        
            <div className='px-4 py-2'>
                <div className='bg-[#fff7e6] w-24 h-24 flex items-center justify-center rounded-full'>
                    <img alt="type_product" src={TypeProduct_img1} className='w-14 h-14'/>
                </div>
                <span className='flex text-center text-[#B2B2B2] text-xs leading-5'>Món mới phải thử</span>
            </div>
    );
};

export default CardTypeProductComponent;
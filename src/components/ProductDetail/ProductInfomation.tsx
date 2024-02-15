import { CloseOutlined, MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import { Image } from 'antd';
import product_1 from '../../assets/product_1.webp';
import { useState } from 'react';

const ProductInfomation = ({onClose}) => {
    const [quantity,setQuantity]=useState(0)
    const handleClickPlus=()=>{
        setQuantity(quantity+1)
    }
    const handleClickMinus=()=>{
        setQuantity(quantity-1)
    }
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50' style={{background: 'rgba(0, 0, 0, 0.4)'}}>
            <div className='bg-white w-[410px] h-[500px] rounded-md overflow-y-scroll'>
            <div className='flex items-center justify-center p-4'>
                <CloseOutlined className='text-xl opacity-50'onClick={()=>onClose()}/>
                <h5 className='text-sm px-24'>Thông tin sản phẩm</h5>
            </div>
            <hr />
            <div className='p-4'>
                <Image src={product_1} alt='product_1' preview={false} className='rounded-md'/>
                <div className='mt-0.5 px-1'>
                    <h1 className='text-lg font-medium'>Trà xanh latte nóng</h1>
                    <p className='text-sm text-[#666666] mt-2 leading-6 tracking-wide flex flex-col text-justify'>
                    Không thể rời môi với Mochi Kem Matcha dẻo mịn, núng nính. Trà Xanh Tây Bắc vị mộc hoà quyện sữa tươi, 
                    foam phô mai beo béo và vụn bánh quy giòn tan, là lựa chọn đậm không khí lễ hội. <br />
                    Món không thể thiếu đá, để ngoại hình và chất lượng được đảm bảo.
                    </p>
                    <div className='flex justify-between mt-3'>
                        <span className='text-base opacity-90 mt-1 justify-start'>45.000đ</span>
                        <span className='flex justify-center'>
                            <MinusCircleFilled onClick={handleClickMinus} className='text-[#FA8C16] text-3xl'/>
                            <span className='px-5 text-center mt-1'>{quantity }</span>
                            <PlusCircleFilled onClick={handleClickPlus} className='text-[#FA8C16] text-3xl'/>
                        </span>
                    </div>
                </div>
            </div>

            <div className='p-3'>
            <button className='flex justify-center w-full rounded-2xl text-white bg-gradient-to-r from-orange-400 to-orange-500'>
                {quantity*45000}đ   Them vao gio hang
            </button>
            </div>
        </div>
        </div>
    );
};

export default ProductInfomation;
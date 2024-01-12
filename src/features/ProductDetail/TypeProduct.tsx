
import CardTypeProductComponent from '../../components/CardTypeProductComponent';
import CardProductComponent from '../../components/CardProductComponent';
import { SearchOutlined, TrophyFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';

const TypeProduct = () => {    
    return (
        <div className='h-[900px] mx-44  mt-[130px] mb-[120px]'>
            <div className='ml-1.5'>
                <div className='flex justify-center'>
                    <span> <TrophyFilled className='text-2xl text-[#faa515] mb-2'/> 
                        <span className='text-3xl'> Sản phẩm từ Nhà</span> 
                    </span>
                    <span className='ml-2 rounded-xl bg-[#e3e3e3] w-8 h-8'><SearchOutlined className='mt-1 ml-1 text-2xl font-bold text-[#838387]'/></span>   
                </div>
               <div className='flex justify-center flex-wrap mt-10'>
                    <CardTypeProductComponent/>
                    <CardTypeProductComponent/>
                    <CardTypeProductComponent/>
                    <CardTypeProductComponent/>
                    <CardTypeProductComponent/>
                    <CardTypeProductComponent/>
                    <CardTypeProductComponent/>
                    <CardTypeProductComponent/>
                    <CardTypeProductComponent/>
                    <CardTypeProductComponent/>
               </div>
               <div className='flex flex-wrap gap-[17px] items-center px-10 mt-10'>
                    <CardProductComponent/>
                    <CardProductComponent/>
                    <CardProductComponent/>
                    <CardProductComponent/>
                    <CardProductComponent/>
                    <CardProductComponent/>
                    <CardProductComponent/>
                    <CardProductComponent/>
                    <CardProductComponent/>
               </div>
            </div>
        </div>
    );
};

export default TypeProduct;

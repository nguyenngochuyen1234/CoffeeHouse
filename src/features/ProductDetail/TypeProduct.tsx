
import CardTypeProductComponent from '../../components/CardTypeProductComponent';
import CardProductComponent from '../../components/CardProductComponent';
import { SearchOutlined, TrophyFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';

const TypeProduct = () => {    
    return (
        <div className='h-[900px] mx-24 mt-[130px] mb-[120px]'>
            <div className='ml-1.5'>
                <div>
                    <Row>
                        <Col span={7} offset={8}>
                            <span> <TrophyFilled className='text-2xl text-[#faa515]'/> 
                                    <span className='text-3xl'> Sản phẩm từ Nhà</span> 
                            </span>
                        </Col>
                        <Col span={1}>
                            <div className='ml-2 rounded-xl bg-[#e3e3e3] w-8 h-8'><SearchOutlined className='mt-1 ml-1 text-2xl font-bold text-[#838387]'/></div>
                        </Col>
                    </Row>
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
               <div className='flex flex-wrap gap-6 items-center px-10 mt-10'>
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

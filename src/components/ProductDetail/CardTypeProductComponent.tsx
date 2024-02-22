import React from 'react';
import TypeProduct_img1 from '../../assets/type_product/tra_sua.png'
import productsApi from '@/api/productsApi';
import { products } from '@/models';
export interface CardTypeProductComponentProps {
    TypeProduct_Name: string
    TypeProduct_Img: string
    TypeProduct_ID:string
    setProducts:React.Dispatch<React.SetStateAction<products[]>>
    products:products[]
}

const CardTypeProductComponent: React.FC<CardTypeProductComponentProps> =  ({TypeProduct_Name, TypeProduct_Img, TypeProduct_ID, setProducts, products}) => {

    const handleClickTypeProduct = async ( ) => {
        try {
            let response = await productsApi.getProductByType(TypeProduct_ID)
            if(response.data){
                setProducts(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const returnBg = () => {
        return products[0]?.TypeProduct_ID == TypeProduct_ID ? "#FFE7BA" : "#fff7e6"
    }
    return (
        <div className='px-4 py-2 cursor-pointer' onClick={handleClickTypeProduct}>
            <div className='bg-[#fff7e6] w-24 h-24 flex items-center justify-center rounded-full'style={{backgroundColor:returnBg()}} >
                <img alt="type_product" src={TypeProduct_Img} className='w-14 h-14' />
            </div>
            <span className='flex w-24 mt-1 text-center text-[#B2B2B2] text-sm leading-5 justify-center'>{TypeProduct_Name}</span>
        </div>
    );
};

export default CardTypeProductComponent;
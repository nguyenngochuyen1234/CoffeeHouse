
import { products } from '@/models';
import product_img1 from '../assets/product_1.webp'

export interface ProductsItemProps {
    item: products
}


const CardComponent: React.FC<ProductsItemProps> = ({ item })=> {
    return (
        <div className='mb-10 mx-3.5'>
            <img alt="example" src={item?.Product_Image} className=' box-border rounded-lg max-w-72 shadow-2xl h-auto'/>
            <div className='pt-3 ml-1 mt-1'>   
                <div className='text-[product_name] mb-1 text-lg font-semibold'>{item?.Product_Name}</div>
                <div className='text-[product_price] opacity-60 mb-2.5'>{item?.Product_Price} đ</div>
            </div>
        </div>            
    );
};

export default CardComponent;
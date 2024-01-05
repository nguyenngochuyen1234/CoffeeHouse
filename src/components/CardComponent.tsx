
import product_img1 from '../assets/product_1.webp'

const CardComponent = () => {
    return (
        <div className='mb-10 mx-3.5'>
            <img alt="example" src={product_img1} className=' box-border rounded-lg max-w-72 shadow-2xl h-auto'/>
            <div className='pt-3'>   
                <div className='text-[product_name] mb-1 text-lg font-semibold'>CloudFree Hạnh nhân Nướng</div>
                <div className='text-[product_price] opacity-60 mb-2.5'>49.000 đ</div>
            </div>
        </div>            
    );
};

export default CardComponent;
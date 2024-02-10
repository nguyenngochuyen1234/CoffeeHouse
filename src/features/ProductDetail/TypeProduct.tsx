import CardProductComponent from '@/components/ProductDetail/CardProductComponent';
import CardTypeProductComponent from '@/components/ProductDetail/CardTypeProductComponent';
import ProductInfomation from '@/components/ProductDetail/ProductInfomation';
import { SearchOutlined, TrophyFilled } from '@ant-design/icons';


const TypeProduct = () => {    
    return (
        <>
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
               <div className='flex flex-wrap gap-[37px] items-center mt-10'>
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
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50' style={{background: 'rgba(0, 0, 0, 0.4)'}}>
            <ProductInfomation/>
        </div>
        </>
    );
};

export default TypeProduct;

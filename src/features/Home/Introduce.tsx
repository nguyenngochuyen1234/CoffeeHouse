import { Carousel } from 'antd';
import React from 'react';
import imgTitle from '../../assets/images/menu/tra_xanh_title.webp'
import { useNavigate } from 'react-router-dom';
const contentStyle: React.CSSProperties = {
  margin: 0,
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  width: '100%',
  height: 'auto',
  borderRadius: '10px'
};


const Introduce = () => {

  const navigate = useNavigate()
  const navigateProducts = () => {
    navigate('product-detail')
    window.scroll(0, 0)
  }
  return (
    <div>
      <section className='cloud-tea flex justify-around'>
        <div className='flex justify-around py-12'>
          <div className='w-[0] sm:w-[49%]'></div>
          <div className='w-[100%] sm:w-[49%]'>
            <img src={imgTitle} alt="" />
            <p className='py-4 text-[18px] opacity-60 text-justify'>Được trồng trọt và chăm chút kỹ lưỡng, nuôi dưỡng từ thổ nhưỡng phì nhiêu, nguồn nước mát lành, bao bọc bởi mây và sương cùng nền nhiệt độ mát mẻ quanh năm, những búp trà ở Tây Bắc mập mạp và xanh mướt, hội tụ đầy đủ dưỡng chất, sinh khí, và tinh hoa đất trời. Chính khí hậu đặc trưng cùng phương pháp canh tác của đồng bào dân tộc nơi đây đã tạo ra Trà Xanh vị mộc dễ uống, dễ yêu, không thể trộn lẫn với bất kỳ vùng miền nào khác.</p>
            <button className='w-[100%] text-[18px] text-[#fff] bg-[#778B37] font-[600]' onClick={navigateProducts}>Thử ngay</button>
          </div>
        </div>
      </section>
      <section className='flex sm:flex-row flex-col w-[100%] slider-store pt-11 pb-[52px]'>
        <div className='sm:w-[47.5%] w-[100%] pl-[93px] flex items-center'>

          <div className='max-w-[75%] py-4'>
            <h3 className='text-[28px] font-[600]'>SIGNATURE <br /> By The Coffee House</h3>
            <p className='text-[18px] text-justify h-[115px] opacity-85'>Nơi cuộc hẹn tròn đầy
              với Cà phê đặc sản, Món ăn đa bản sắc và Không gian cảm hứng.</p>
            <button className='w-[100%] text-[18px] text-[#fff] bg-[#C8070F] font-[600]'>Tìm hiểu thêm</button>
          </div>
        </div>
        <div className='sm:w-[52.5%] w-[100%]'>

          <Carousel className='w-[100%]'>
            <div>
              <img style={contentStyle} src="https://file.hstatic.net/1000075078/file/_kh_9431__1__e19a7a49963245b39b280271da3cd9fb_master.jpg" alt="" />
            </div>
            <div>
              <img style={contentStyle} src="https://file.hstatic.net/1000075078/file/_kh_9290_df84171506554f16b8e55bff9a6c0dd1_master.jpg" alt="" />
            </div>
            <div>
              <img style={contentStyle} src="https://file.hstatic.net/1000075078/file/_kh_9308_71dd5f99cfe4431a82bbf9dae99f71ea_master.jpg" alt="" />
            </div>
            <div>
              <img style={contentStyle} src="https://file.hstatic.net/1000075078/file/_kh_9302_5a346ad2dafa4f02afd24481f5ca9a1e_master.jpg" alt="" />
            </div>

          </Carousel>
        </div>
      </section>
    </div>
  )
}

export default Introduce
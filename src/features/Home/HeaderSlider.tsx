import { Carousel, Image } from "antd"
import slider1 from '../../assets/web_moi_-_desktop_b5a00ce640cf431b90b75feee7ab480d.webp'
import slider2 from '../../assets/desktop_9385860226df4a81afcedf520f9a563f.webp'
import slider3 from '../../assets/desktop_9c03e90bd535442e9ac18d23fc551cb6.webp'

const SliderHeader = () => {
  const imgArray = [slider1,slider2,slider3]
  
  return (
    <Carousel autoplay className="absolute top-0 left-0 w-full h-full">
    {imgArray.map((img, idx)=>{
          return (<Image key={idx} src={img} alt="slider" preview={false}/>)
    })}
  </Carousel>
  )
}

export default SliderHeader
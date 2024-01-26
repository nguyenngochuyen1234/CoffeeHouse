import { Image } from 'antd';

const blogsData = [
  {
    "blogTitle": "Coffeeholic",
    "blogList": [
      {
        "img": "https://file.hstatic.net/1000075078/article/thecoffeehouse_caphehighlight01_de40c0102a954c50a328f7befcdd82bd_grande.jpg",
        "time": "01/11/2023",
        "title": "BẮT GẶP SÀI GÒN XƯA TRONG MÓN UỐNG HIỆN ĐẠI CỦA GIỚI TRẺ",
        "description": "Dẫu qua bao nhiêu lớp sóng thời gian, người ta vẫn có thể tìm lại những dấu ấn thăng trầm của một Sài Gòn xưa cũ. Trên những góc phố,..."
      },
      {
        "img": "https://file.hstatic.net/1000075078/article/1200x630_0b0081d93ba6479b934e04e71cbfd102_grande.jpg",
        "time": "01/11/2023",
        "title": "CHỈ CHỌN CÀ PHÊ MỖI SÁNG NHƯNG CŨNG KHIẾN CUỘC SỐNG CỦA BẠN THÊM THÚ VỊ, TẠI SAO KHÔNG?",
        "description": "Thực chất, bạn không nhất thiết phải làm gì to tát để tạo nên một ngày rực rỡ. Chỉ cần bắt đầu từ những việc nhỏ nhặt nhất, khi bạn..."
      },
      {
        "img": "https://file.hstatic.net/1000075078/article/3__1__2b67342f4db64bb082944cf078afd910_grande.jpg",
        "time": "01/11/2023",
        "title": "SIGNATURE - BIỂU TƯỢNG VĂN HOÁ CÀ PHÊ CỦA THE COFFEE HOUSE ĐÃ QUAY TRỞ LẠI",
        "description": "Mới đây, các tín đồ cà phê đang bàn tán xôn xao về SIGNATURE - Biểu tượng văn hóa cà phê của The Coffee House đã quay trở lại.Một lời..."
      },
    ]
  },
  {
    "blogTitle": "Blog",
    "blogList": [
      {
        "img": "https://file.hstatic.net/1000075078/article/thecoffeehouse_timesquare_02_b87f7576b02d4d82ba5b7ed4e40b6b00_grande.png",
        "time": "01/11/2023",
        "title": "LY CÀ PHÊ SỮA ĐÁ VIỆT NAM XUẤT HIỆN Ở QUẢNG TRƯỜNG THỜI ĐẠI NEW YORK",
        "description": "Ấn tượng và tự hào, hình ảnh Việt Nam tiếp tục được lên sóng tại Quảng trường Thời Đại (New York) với ly cà phê sữa đá quen thuộc, đi..."
      },
      {
        "img": "https://file.hstatic.net/1000075078/article/thecoffeehouse_traxanhtaybac_1_d8c2ac635c5941a19c0065339727e41a_grande.jpg",
        "time": "01/11/2023",
        "title": "NGƯỢC LÊN TÂY BẮC GÓI VỊ MỘC VỀ XUÔI",
        "description": "Những dải ruộng bậc thang, các cô gái Thái với điệu múa xòe hoa, muôn cung đường ngợp mùa hoa… đó là rẻo cao Tây Bắc luôn làm say lòng..."
      },
      {
        "img": "https://file.hstatic.net/1000075078/article/7_tam_focus_ly_69c0bd5016024cba868e270d8ccbe696_grande.jpg",
        "time": "01/11/2023",
        "title": "ĐI VAY LẠNH - TỪ VỰNG HẸN HÒ MỚI NỔI, CẬP NHẬT NGAY KẺO LỖI THỜI ",
        "description": "Đi “vay lạnh” - từ vựng hẹn hò mới nổi, cập nhật ngay kẻo lỗi thời  Nếu “đi trà sữa”, “đi đu đưa”... đã trở thành những lời rủ rê..."
      },
    ]
  },
  {
    "blogTitle": "Teaholic",
    "blogList": [
      {
        "img": "https://file.hstatic.net/1000075078/article/an_banh_uong_nuoc_nhom_03_d499c0cab14746588fff6fe0dee678ad_grande.jpg",
        "time": "01/11/2023",
        "title": "TRUNG THU NÀY, SAO BẠN KHÔNG TỰ CHO MÌNH ",
        "description": "TRUNG THU NÀY, SAO BẠN KHÔNG TỰ CHO MÌNH DỪNG MỘT CHÚT THÔI, THƯỞNG MỘT CHÚT TRÔI?"
      },
      {
        "img": "https://file.hstatic.net/1000075078/article/cautoankeothom_thecoffeehouse_03_29cd435c9a574e1a867ac36f2c863bb6_grande.jpg",
        "time": "01/11/2023",
        "title": "BỘ SƯU TẬP CẦU TOÀN KÈO THƠM: VÍA MAY MẮN KHÔNG THỂ BỎ LỠ TẾT NÀY",
        "description": "Tết nay vẫn giống Tết xưa, không hề mai một nét văn hoá truyền thống mà còn thêm vào những hoạt động “xin vía” hiện đại, trẻ trung. Ví như..."
      },
      {
        "img": "https://file.hstatic.net/1000075078/article/dscf0216_2890bcca44ae49aaaf843d5fa3db2fc6_grande.jpg",
        "time": "01/11/2023",
        "title": "KHUẤY ĐỂ THẤY TRĂNG - KHUẤY LÊN NIỀM HẠNH PHÚC: TRẢI NGHIỆM KHÔNG THỂ BỎ LỠ MÙA TRUNG THU NÀY",
        "description": "Năm 2022 là năm đề cao sức khỏe tinh thần nên giới trẻ muốn tận hưởng một Trung thu với nhiều trải nghiệm mới mẻ, rôm rả cùng bạn bè..."
      },
    ]
  }
]
const BlogList = () => {
  return (
    <>
      {
        blogsData.map(blog => {
          return (
            <div className="mx-auto px-4">
              <h3 className="blog_home_blogtitle">{blog.blogTitle}</h3>
              <div className="flex flex-wrap">
                {
                  blog.blogList.map(blogItem => <div className="blog_item">
                    <Image
                      width={'100%'}
                      preview={false}
                      className='blog_item_img'
                      src={blogItem.img}
                    />
                    <div className='article_item_info'>
                      <span className='text-[#00000099]'>{blogItem.time}</span>
                      <h3>
                        <a className="article_item_image" href="#" title={blogItem.title}>{blogItem.title}</a>
                      </h3>
                      <p className='opacity-80'>{blogItem.description}</p>
                    </div>
                  </div>)
                }
              </div>
            </div>
          )
        })
      }
    </>
  )
}
const Blog = () => {
  return (
    <div className='w-[100%] bg-[#FFF7E6] pb-[150px]'>
      <div className="flex justify-center items-center pt-10">
        <img src="https://file.hstatic.net/1000075078/file/coffee-2_2_92db24958ff14ac4b4249b3256f7a415.png" alt="" />
        <h1 className="text-[28px] font-[600]">Chuyện nhà</h1>
      </div>
      <BlogList />

    </div>
  )
}

export default Blog
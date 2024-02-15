import { newsFakeApi } from '@/api/newsFakeApi';
import typeNewsApi from '@/api/typeNewsApi';
import { blogsData, newsRow, typeNews } from '@/models';
import { sliceParagraph } from '@/utils/paragraph';
import { Image } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const navigate = useNavigate()
  const [blogsData, setBlogsData] = useState<blogsData[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        let blogs: blogsData[] = []
        const response = await typeNewsApi.getAllTypeNews();
        if (response?.data) {
          response.data.forEach((item: typeNews) => {
            let blogList = newsFakeApi.filter(news => news.TypeNews_Name == item.TypeNews_Name)
            blogs.push({
              "blogTitle": item.TypeNews_Name,
              "blogList": blogList
            })
          })

        }
        setBlogsData(blogs)
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [])
  const navigateBlog = (blog: newsRow) => {
    navigate(`blogs/${blog.TypeNews_Name}/${blog.News_ID}`)
    window.scrollTo(0, 0);
  }
  return (
    <>
      {
        blogsData.map(blog => {
          return (
            <div className="mx-auto px-4" >
              <h3 className="blog_home_blogtitle">{blog.blogTitle}</h3>
              <div className="flex flex-wrap">
                {
                  blog.blogList.map(blogItem => <div key={blogItem.News_ID} className="blog_item" onClick={() => { navigateBlog(blogItem) }}>
                    <Image
                      width={'100%'}
                      preview={false}
                      className='blog_item_img'
                      src={blogItem.News_Image}
                    />
                    <div className='article_item_info'>
                      <span className='text-[#00000099]'>{blogItem.time}</span>
                      <h3>
                        <a className="article_item_image" href="#" title={blogItem.News_Title}>{blogItem.News_Title}</a>
                      </h3>
                      <p className='opacity-80'>{sliceParagraph(blogItem.News_Description, 200)}</p>
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
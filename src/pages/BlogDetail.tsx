import { newsFakeApi } from '@/api/newsFakeApi';
import { newsRow } from '@/models';
import { navigatePageBlog } from '@/utils/page';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
export interface blog{
  typeNews:string
  idNews:string
}
const BlogDetail = () => {

  const navigate = useNavigate()

  let [idNews, setIdNews] = useState(useParams().idNews)
  let [typeNews, setTypeNews] = useState(useParams().typeNews)
  let [prevBlog, setPrevBlog] = useState<blog | null>()
  let [nextBlog, setNextBlog] = useState<blog | null>()
  const [blog, setBlog] = useState<newsRow>()
  useEffect(() => {
    let blogData = newsFakeApi.find(item => item.News_ID === idNews && item.TypeNews_Name == typeNews)
    if(blogData){
      let {nextBlog, prevBlog} = navigatePageBlog(blogData)
      setNextBlog(nextBlog)
      setPrevBlog(prevBlog)
      setBlog(blogData)
    }

  }, [idNews, typeNews])
  const navigateNextBlog = () => {
    if(nextBlog){
      navigate(`/blogs/${nextBlog.typeNews}/${nextBlog.idNews}`)
      setIdNews(nextBlog.idNews)
      setTypeNews(nextBlog.typeNews)
      window.scrollTo(0, 0);
    }
  }
  const navigatePrevBlog = () => {
    if(prevBlog){
      navigate(`/blogs/${prevBlog.typeNews}/${prevBlog.idNews}`)
      setIdNews(prevBlog.idNews)
      setTypeNews(prevBlog.typeNews)
      window.scrollTo(0, 0);
    }

  }
  return (
    <main>
      <div id='article'>
        <div className='article_image h-[500px]' style={{ backgroundImage: `url(${blog?.News_Image})`, backgroundRepeat: 'no-repeat', width: '100%', backgroundSize: 'cover' }}>
        </div>
        <div className='max-w-[1000px] mx-auto p-8'>
          <div>
            <ol className='inline-flex leading-4 text-[18px] items-center gap-2'>
              <li>Blog</li>
              <li className='h-4 w-[2px] bg-[#000000]'></li>
              <li className='text-[#777777]'>{blog?.TypeNews_Name}</li>
            </ol>
          </div>
          <h1 className='my-5 text-[34px] font-[600] '>{blog?.News_Title}</h1>
          <div dangerouslySetInnerHTML={{ __html: blog?.News_Content || '' }} className="overflow-auto"></div>
      <div className='flex justify-between py-10 text-[#fff]'>
        <button className='bg-[#000] text-[18px] w-[200px] font-[500] rounded-none' style={{visibility:prevBlog?'visible' : 'hidden'}} onClick={navigatePrevBlog}>BÀI TRƯỚC</button>
        <button className='bg-[#000] w-[200px] text-[18px] font-[500] rounded-none' onClick={navigateNextBlog} style={{visibility:nextBlog?'visible' : 'hidden'}} >BÀI KẾ TIẾP</button>
      </div>
      <div className='h-[1px] w-[100%] bg-[#000]'></div>
        </div>
      </div>
    </main>
  )
}

export default BlogDetail
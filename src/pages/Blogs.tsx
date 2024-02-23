import newsApi from '@/api/newsApi';
import { news, newsRow } from '@/models';
import { sliceParagraph } from '@/utils/paragraph';
import { Image, Row, Col, Pagination, PaginationProps } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
export interface NewsItemProps {
    blogItem: news
}

const NewsItem: React.FC<NewsItemProps> = ({ blogItem }) => {

    const navigate = useNavigate()

    const navigateBlog = () => {
        navigate(`${blogItem.News_ID}`)
        window.scrollTo(0, 0);
    }


    return (
        <div key={blogItem.News_ID} className="blog_item mx-0 w-[380px]">
            <Image
                width={'380px'}
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
                <button className='btn-blog' onClick={navigateBlog}>Xem thêm</button>
            </div>
        </div>
    )
}

const Blogs = () => {
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0)
    const fetchData = async () => {
        window.scrollTo(0, 0);
        try {
            let response = await newsApi.pagination(current, typeNews)
            console.log(response)
            if (response.data) {
                setBlogs(response.data)
                setTotal(response.data[0]?.total_news_count)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);

    };
    const [typeNews, setTypeNews] = useState(useParams().typeNews || '')
    const [blogs, setBlogs] = useState<news[]>([])
    useEffect(() => {
        fetchData()
    }, [typeNews, current])
    return (
        <div>
            <div className='w-[100%] h-[300px] img_bg_typenews ' >
                <p className='absolute text-[#fff] uppercase text-4xl font-[700] left-[70px] top-[50%]'>{typeNews}</p>
            </div>
            <div className='w-[85%] mx-auto mb-5 py-4'>
                <b className='text-[25px]'>{typeNews}</b>
                <div className='mt-6'>
                    <Row>
                        <Col xs={24} md={16} sm={24} className='grid grid-cols-2 gap-3'>
                            {blogs.map((blog, index) => (
                                <NewsItem key={index} blogItem={blog} />
                            ))}
                            <div className='absolute w-[1px] bg-[orange] h-[600px] top-0 right-3'></div>
                        </Col>
                        <Col xs={24} md={8} sm={24}>
                            <p className='text-[30px] font-[600]'>E-BOOK</p>
                            <ul className='grid grid-cols-2 gap-3'>
                                <li><a href="https://thecoffeehouse.com/blogs/crop/hanh-trinh-hanh-phuc" ><img className='img-ebook' src="https://file.hstatic.net/1000075078/article/thumbnail_photobook_cb264086a49440b48a95d4c148bbea0e_large.jpg" alt="img" /></a></li>
                                <li><a href="https://thecoffeehouse.com/blogs/crop/hanh-trinh-hanh-phuc"><img src="https://file.hstatic.net/1000075078/article/crop32_large.jpg" alt="img" /></a></li>
                                <li><a href="https://thecoffeehouse.com/blogs/crop/hanh-trinh-hanh-phuc"><img src="https://file.hstatic.net/1000075078/article/crop22_large.jpg" alt="img" /></a></li>
                                <li><a href="https://thecoffeehouse.com/blogs/crop/hanh-trinh-hanh-phuc"><img src="https://file.hstatic.net/1000075078/article/crop12_large.jpg" alt="img" /></a></li>
                            </ul>
                        </Col>
                    </Row>
                </div>
                <Pagination current={current} onChange={onChange} defaultPageSize={5} total={total} showSizeChanger={false} />
            </div>
        </div >
    )
}

export default Blogs
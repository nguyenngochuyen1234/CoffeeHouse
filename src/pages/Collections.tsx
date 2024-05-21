import React, { useEffect, useState } from 'react'
import { Row, Col, Spin } from 'antd'
import { blockMenuItem, fullMenu, menu, typeProducts } from '@/models'
import menuApi from '@/api/menuApi'
import { useNavigate, useParams } from 'react-router-dom'
import typeProductsApi from '@/api/typeProductsApi'
import productsApi from '@/api/productsApi'


export interface CollectionsProps {
}

const Collections: React.FC<CollectionsProps> = () => {
  const navigate = useNavigate()
  const { idMenu } = useParams()
  const [menus, setMenu] = useState<fullMenu[]>([])
  const [products, setProducts] = useState<blockMenuItem[]>([])
  const [selectedTypeProduct, setSelectedTypeProduct] = useState<string | null>('all');
  const [loading, setLoading] = React.useState(false);
  const fetchMenu = async () => {
    try {
      setLoading(true)
      let res = await typeProductsApi.getAllTypeProduct()
      let allMenu = []
      let productShow = []
      if (res.data) {
        let resultMenuArray: fullMenu[] = [];
        res.data.forEach((item: typeProducts) => {
          let existingItem = resultMenuArray.find((element: fullMenu) => element.Menu_ID === item.Menu_ID);
          if (existingItem) {
            existingItem.typeProducts.push(item);
          } else {
            resultMenuArray.push({
              Name_Menu: item.Name_Menu,
              Menu_ID: item.Menu_ID, active: false, typeProducts: [item]
            });
          }
          allMenu = [{
            Name_Menu: 'Tất cả',
            Menu_ID: 'all', active: false, typeProducts: []
          }, ...resultMenuArray]
        })
        allMenu = [{
          Name_Menu: 'Tất cả',
          Menu_ID: 'all', active: false, typeProducts: []
        }, ...resultMenuArray]
        setMenu(allMenu)
        console.log(allMenu)
        for (let menu of allMenu) {
          for (let item of menu.typeProducts) {
            let productItems = await productsApi.getProductByType(item.TypeProduct_ID)
            if (productItems.data) {
              productShow.push({
                title: item.TypeProduct_Name,
                products: productItems.data
              })
            }
          }
        }
      }
      setProducts(productShow)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  useEffect(() => {
    fetchMenu()
  }, [])
  const handldeClickMenu = async (menu: fullMenu) => {
    setLoading(true)
    try {
      setSelectedTypeProduct(menu.Menu_ID)
      if (menu.Menu_ID == 'all') {
        fetchMenu()
      } else {
        let productShow = []
        for (let item of menu.typeProducts) {
          let productItems = await productsApi.getProductByType(item.TypeProduct_ID)
          if (productItems.data) {
            productShow.push({
              title: item.TypeProduct_Name,
              products: productItems.data
            })
          }
        }
        setProducts(productShow)
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)

      console.log(err)
    }
  }
  const handleClickTypeProduct = async (typeProduct: typeProducts) => {
    setLoading(true)
    try {
      let productItems = await productsApi.getProductByType(typeProduct.TypeProduct_ID)
      setSelectedTypeProduct(typeProduct.TypeProduct_ID)
      if (productItems.data) {
        setProducts([{
          title: typeProduct.TypeProduct_Name,
          products: productItems.data
        }])
      }
      setLoading(false)

    } catch (err) {
      console.log(err)
      setLoading(false)

    }
  }
  return (
    <div className='content' style={{ marginTop: '80px' }}>
      <Row>
        <Col xs={4} sm={4} className='relative'>
          <div className='sticky top-[70px]'>

            {menus.map(item => <ul className={`cursor-pointer text15-light my-3 text-[#676767] ${selectedTypeProduct === item.Menu_ID ? 'index_active' : ''}`} key={item.Name_Menu} onClick={() => handldeClickMenu(item)} style={{ listStyleType: 'disc' }}>{item.Name_Menu}
              {item.typeProducts.map(typeProduct => <li className={`ml-5 my-2 ${selectedTypeProduct === typeProduct.TypeProduct_ID ? 'index_active' : ''}`} key={typeProduct.TypeProduct_ID} onClick={(e) => {
                e.stopPropagation();
                handleClickTypeProduct(typeProduct);
              }}>{typeProduct.TypeProduct_Name}</li>)}
            </ul>)}
            <div className='w-[2px] h-[100%] bg-[#e7e7e7] absolute right-0 top-0'></div>
          </div>

        </Col>
        <Col xs={20} sm={20} className='pl-[72px] pr-[15px]'>
          <Spin spinning={loading}>
            {products.map(item => <section className='!pb-10'>
              <h1 className='text25-bold mb-8'>{item.title}</h1>
              <div className='grid grid-cols-[250px,250px,250px] gap-10'>
                {item.products.map(product => <div className='cursor-pointer' key={product.idProduct} onClick={() => navigate(`/products/${product.idProduct}`)}>
                  <img className='h-[280px] w-[250px] rounded-lg img_menu' src={product.Product_Image} alt="" />
                  <p className='text16-bold mt-4'>{product.Product_Name}</p>
                  <span className='text14-light text-[#787578]'>{product.Product_Price} đ</span>
                </div>)}
              </div>
            </section>)}
          </Spin>
        </Col>
      </Row>
    </div>
  )
}

export default Collections
import React, { useEffect, useState } from 'react'
import { optionsProduct, products } from '@/models'
import { useParams, useNavigate } from 'react-router-dom'
import productsApi from '@/api/productsApi'
import { ProfileFilled, PlusCircleFilled, MinusCircleFilled } from '@ant-design/icons'
import { Button, Col, Divider, Row, Spin } from 'antd'
import { ButtonProduct } from '@/components/Home/ButtonProduct'
import iconDelivery from '@/assets/images/iconDelivery.svg'
import toppingApi from '@/api/toppingApi'
import { topping, toppingShow } from '@/models/topping'
import { useAuth } from '@/AuthContext'
export interface ProductPageProps {

}
const sizeProduct = [
  {
    name: "Nhỏ",
    price: 10000,
    checked: false
  },
  {
    name: "Vừa",
    price: 15000,
    checked: false
  },
  {
    name: "Lớn",
    price: 20000,
    checked: false
  },
]

const toppingProduct = [
  {
    name: "Trái vải",
    price: 10000,
    checked: false
  },
  {
    name: "Đào miếng",
    price: 10000,
    checked: false
  },
  {
    name: "Trân châu trắng",
    price: 10000,
    checked: false
  },

]

const ProductPage: React.FC<ProductPageProps> = ({ }) => {

  const navigate = useNavigate()
  const {auth} = useAuth()

  let idProduct = useParams().idProduct
  const [product, setProduct] = useState<products | null>()
  const [size, setSize] = useState<optionsProduct[]>(sizeProduct)
  const [topping, setTopping] = useState<toppingShow[]>([])
  const [relatedProducts, setRelatedProducts] = useState<products[]>([])
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(0)
  const [originalPrice, setOriginalPrice] = useState(0)
  const [priceNotUpdate, setPriceNotUpdate] = useState(0)
  const [loading, setLoading] = useState(false)
  const fetchDataProduct = async () => {
    setLoading(true)
    try {
      if (idProduct) {
        let response = await productsApi.detailProduct(idProduct)
        let data = response.data
        let dataTopping = await toppingApi.getProductTopping(idProduct)
        if(dataTopping.data){
          let toppingShow = dataTopping.data.map((item:topping)=> {
            return({
              ...item, checked:false
            })
          })
          setTopping(toppingShow)
        }
        if (data) {
          setProduct(data)
          setTotal(data.Product_Price)
          setOriginalPrice(data.Product_Price)
          let responseProductByType = await productsApi.getProductByType(data?.TypeProduct_ID)
          let dataProductByType = responseProductByType.data
          let dataRelatedProduct = dataProductByType.filter((item: products) => item.idProduct !== idProduct)
          setRelatedProducts(dataRelatedProduct)
        }
      }
      setLoading(false)

    } catch (error) {
      setLoading(false)

      console.log({ error })
    }
  }
  useEffect(() => {
    fetchDataProduct()
  }, [idProduct])


  useEffect(() => {
    setTotal(quantity * priceNotUpdate)
  }, [quantity, priceNotUpdate])


  const clickRelatedProduct = (idProduct: string) => {
    navigate(`/products/${idProduct}`)
    window.location.reload()
  }

  const clickOption = (type: string, name: string) => {
    let totalOption = 0
    let sizeArrUpdate: optionsProduct[] = size
    let toppingArrUpdate: toppingShow[] = topping
    if (type == "size") {
      sizeArrUpdate = size.map(item => item.name === name ? { ...item, checked: true } : { ...item, checked: false })
      setSize(sizeArrUpdate)
    } else if (type == "topping") {
      toppingArrUpdate = topping.map(item => item.Topping_Name === name ? { ...item, checked: !item.checked } : item)
      setTopping(toppingArrUpdate)
    }
    sizeArrUpdate.forEach(item => {
      if (item.checked) {
        totalOption += item.price
      }
    })
    toppingArrUpdate.forEach(item => {
      if (item.checked) {
        totalOption += item.Topping_Price
      }
    })
    setPriceNotUpdate(originalPrice + totalOption)
  }

  const handleChangeQuatity = (type: string) => {
    if (type == 'minus') {
      if (quantity > 1) {
        setQuantity(prev => prev - 1)
      }
    }
    else if (type == 'plus') {
      setQuantity(prev => prev + 1)
    }

  }

  const handleOrder = async() => {
    try{
      if(auth){
        let sizeName = size.find(item => item.checked)?.name
        let toppings = topping.filter(item => item.checked)
        console.log({sizeName, toppings, total})
      }else{
        navigate('login')
      }
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className='content'>
      <Spin spinning={loading}>
        <ol className='inline-flex py-2 my-5 leading-4 text-[18px] items-center gap-2 font-[500]'>
          <li>Blog</li>
          <li className='h-4'>/</li>
          <li className='text-[#777777]'>{product?.TypeProduct_Name}</li>
          <li className='h-4'>/</li>
          <li className='text-[#777777]'>{product?.Product_Name}</li>
        </ol>
        <Row className='mb-5'>
          <Col xs={12} sm={12} md={12} className='pr-3'>
            <img className='w-[570px] h-[570px]' src={product?.Product_Image} alt="" />
          </Col>
          <Col xs={12} sm={12} md={12}  className='px-3'>
            <h1 className='text-[26px] font-[500]'>{product?.Product_Name}</h1>
            <div className='flex justify-between'>
              <p className='text-[26px] font-[500] text-[#e57905] mt-4 mb-10'>{total} đ</p>
              <div className='flex gap-5 items-center justify-center'>
                <MinusCircleFilled className='btn_quantity' style={{ color: `${quantity > 1 ? '#fa8c16' : '#e5e5e5'}` }} onClick={() => handleChangeQuatity('minus')} />
                <p className='text-[25px] my-0' >{quantity}</p>
                <PlusCircleFilled className='btn_quantity' onClick={() => handleChangeQuatity('plus')} style={{ color: '#fa8c16' }} />
              </div>
            </div>
            {size.length > 0 && <div>
              <p className='mb-3 text-[18px] font-[400]'>Chọn size (bắt buộc)</p>
              <div className='flex gap-4 flex-wrap'>
                {size.map(item => <ButtonProduct name={item.name} key={item.name} price={item.price} clickOption={clickOption} checked={item.checked} type="size" />)}
              </div>
            </div>}
            {topping.length > 0 && <div>
              <p className='mb-3 text-[18px] font-[400] mt-6'>Topping</p>
              <div className='flex gap-4 flex-wrap'>
                {topping.map((item:toppingShow) => <ButtonProduct name={item.Topping_Name} key={item.Topping_Name} checked={item.checked} price={item.Topping_Price} clickOption={clickOption} type="topping" />)}
              </div>
            </div>}
            <div className='border-[#c9c9c9] border-[1px] rounded-[5px] h-[46px] flex overflow-hidden mt-4'>
              <div className='flex bg-[#f5f5f5] py-4 px-3'>
                <ProfileFilled style={{ color: '#e5e5e5', fontSize: '23px' }} />
              </div>
              <input className='h-[100%] mx-3 w-[100%] outline-none text-[18px]' placeholder='Ghi chú thêm cho món này' />
            </div>
            <div className='text-[#fff] bg-[#e57905] mt-4 cursor-pointer font-[500] text-[17px] border-[1px] rounded-[8px] py-1 px-5'>
              <div className='h-10 flex justify-center items-center' onClick={handleOrder}>
                <img className='mr-1' src={iconDelivery} alt="" />
                Đặt giao tận nơi
              </div>
            </div>
          </Col>
        </Row>
        {product?.Product_Description && <div>
          <Divider />
          <section className='my-10'>
            <h1 className='mb-2 text-[20px] font-[500]'>Mô tả sản phẩm</h1>
            <p className='mb-2 text-[18px] leading-[26px]'>{product?.Product_Description}</p>
          </section>
        </div>}
        {relatedProducts.length > 0 && <>
          <Divider />
          <section className='my-10'>
            <h1 className='mb-2 text-[20px] font-[500]'>Sản phẩm liên quan</h1>
            <div className='flex flex-row gap-6'>
              {relatedProducts.map(item => <div key={item.idProduct} className='menu_item w-[170px] cursor-pointer' onClick={() => clickRelatedProduct(item.idProduct)}>
                <img className='menu_item_image' src={item.Product_Image} alt="" />
                <h1 className='mb-2 text-[17px] leading-[25px] font-[600] mt-3'>{item.Product_Name}</h1>
                <p className='mb-2 text-[15px] leading-[20px] text-[#0009] mt-1'>{item.Product_Price} đ</p>
              </div>)}
            </div>
          </section>
        </>}
      </Spin>
    </div>
  )
}

export default ProductPage
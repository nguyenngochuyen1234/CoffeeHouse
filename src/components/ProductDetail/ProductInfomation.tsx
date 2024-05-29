import { CloseOutlined, MinusCircleFilled, ProfileFilled, PlusCircleFilled } from '@ant-design/icons';
import { Image, Radio } from 'antd';
import React, { useEffect, useState } from 'react'
import { optionsProduct, products } from '@/models'
import { useParams, useNavigate } from 'react-router-dom'
import productsApi from '@/api/productsApi'
import { Checkbox, Col, Divider, Row, Spin } from 'antd'
import { ButtonProduct } from '@/components/Home/ButtonProduct'
import iconDelivery from '@/assets/images/iconDelivery.svg'
import toppingApi from '@/api/toppingApi'
import { topping, toppingShow } from '@/models/topping'
import { useAuth } from '@/AuthContext'
import orderApi from '@/api/orderApi'
import { Toppings, orderDetailsProduct } from '@/models/order'
import { formatCurrency } from '@/utils/paragraph';

export interface ProductInfomationProps {
    onClose: () => void
    idProduct: string
}

const ProductInfomation: React.FC<ProductInfomationProps> = ({ onClose, idProduct }) => {
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
    const navigate = useNavigate()
    const { auth, setOrderDetails } = useAuth()
    const [sizePrice, setSizePrice] = useState(0);
    const [sizeName, setSizeName] = useState('')
    const [product, setProduct] = useState<products | null>()
    const [size, setSize] = useState<optionsProduct[]>(sizeProduct)
    const [topping, setTopping] = useState<toppingShow[]>([])
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(0)
    const [originalPrice, setOriginalPrice] = useState(0)
    const [priceNotUpdate, setPriceNotUpdate] = useState(0)
    const [loading, setLoading] = useState(false)
    const [idDetailProductExist, setIdDetailProductExist] = useState('')
    const fetchDataProduct = async () => {
        setLoading(true)
        try {
            if (idProduct) {
                let response = await productsApi.detailProduct(idProduct)
                let data = response.data
                if (data) {
                    setProduct(data)
                    setTotal(data.Product_Price)
                    setOriginalPrice(data.Product_Price)
                }
                let dataTopping = await toppingApi.getProductTopping(idProduct)
                let orderDetailProductExist = await orderApi.getOrderDetailsProduct(idProduct)
                if (orderDetailProductExist.data[0]) {
                    let detailsProductExits = orderDetailProductExist.data[0]
                    setQuantity(detailsProductExits.Order_Quantity)
                    setIdDetailProductExist(detailsProductExits.Order_Detail_ID)
                    let sizeDefault = sizeProduct.map(item => item.name == detailsProductExits.Order_Size ? { ...item, checked: true } : item)
                    let sizeValueDefault = sizeProduct.find(item => item.name == detailsProductExits.Order_Size)?.price
                    setSizeName(detailsProductExits.Order_Size)
                    let toppingDefault = dataTopping.data.map((item1: topping) => ({
                        ...item1,
                        checked: detailsProductExits.Toppings.some((item2: Toppings) => item2.Topping_Addition_Name === item1.Topping_Name)
                    }))
                    setSize(sizeDefault)
                    setTopping(toppingDefault)
                    let totalOption = 0
                    toppingDefault.forEach((item: toppingShow) => {
                        if (item.checked) {
                            totalOption += item.Topping_Price
                        }
                    })
                    setPriceNotUpdate(detailsProductExits?.Product_Price + totalOption + sizeValueDefault)
                }
                else {
                    if (dataTopping.data) {
                        let toppingShow = dataTopping.data.map((item: topping) => {
                            return ({
                                ...item, checked: false
                            })
                        })
                        setTopping(toppingShow)
                    }
                }

            }
            setLoading(false)

        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchDataProduct()

    }, [idProduct])


    useEffect(() => {
        console.log({ quantity, priceNotUpdate })
        setTotal(quantity * priceNotUpdate)
    }, [quantity, priceNotUpdate])



    const clickOption = (type: string, name: string) => {
        let totalOption = 0
        let toppingArrUpdate: toppingShow[] = topping
        if (type == "topping") {
            toppingArrUpdate = topping.map(item => item.Topping_Name === name ? { ...item, checked: !item.checked } : item)
            setTopping(toppingArrUpdate)
        }
        toppingArrUpdate.forEach(item => {
            if (item.checked) {
                totalOption += item.Topping_Price
            }
        })
        setPriceNotUpdate(originalPrice + totalOption + sizePrice)
    }
    useEffect(() => {
        clickOption('', '')
        console.log('hello')
    }, [sizePrice])

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

    const handleChangeOptionTopping = (name: string) => {
        setSizeName(name)
        let sizeArrUpdate = size.map(item => {
            if (item.name === name) {
                setSizePrice(item.price)
                return { ...item, checked: true }
            } else {
                return { ...item, checked: false }
            }
        })
        setSize(sizeArrUpdate)
    }

    const handleOrder = async () => {
        try {
            setLoading(true)
            if (auth && idProduct) {
                let sizeName = size.find(item => item.checked)?.name
                let toppings = topping.filter(item => item.checked)
                let toppingsAddition = toppings.map((topping: toppingShow) => {
                    return ({
                        Topping_Addition_Name: topping.Topping_Name,
                        Topping_Addition_Price: topping.Topping_Price
                    })
                })
                let orderDetailProductData = {
                    Order_Size: sizeName || 'Vừa',
                    Order_Quantity: quantity,
                    Toppings: toppingsAddition,
                    idProduct: idProduct,
                }
                if (idDetailProductExist) {
                    await orderApi.updateOrderProduct(idDetailProductExist, orderDetailProductData)
                    setOrderDetails(prev => prev.map((item: orderDetailsProduct) => item.Order_Detail_ID === idDetailProductExist ? { ...item, ...orderDetailProductData } : item))
                    onClose()
                } else {
                    let response = await orderApi.AddOrder(orderDetailProductData)
                    navigate('/checkout')
                }
            } else {
                navigate('/login')
            }
            setLoading(false)

        } catch (err) {
            setLoading(false)
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50' style={{ background: 'rgba(0, 0, 0, 0.4)' }}>

            <div className='bg-white w-[410px] h-[500px] rounded-md overflow-y-scroll modal-detail-product'>
                <Spin spinning={loading}>
                    <div className='flex items-center justify-center p-4'>
                        <CloseOutlined className='text-xl opacity-50' onClick={() => onClose()} />
                        <b className='text15-bold px-24'>Thông tin sản phẩm</b>
                    </div>
                    <hr />
                    <div className='p-4'>
                        <Image src={product?.Product_Image} alt='product_1' preview={false} className='rounded-md' />
                        <div className='mt-0.5 px-1'>
                            <h1 className='text-lg font-medium'>{product?.Product_Name}</h1>
                            <p className='text-sm text-[#666666] mt-2 leading-6 tracking-wide flex flex-col text-justify'>{product?.Product_Description}</p>
                        </div>
                        <div className='flex justify-between items-center my-4'>
                            <p className='text-[18px] font-[500] text-[#e57905] mt-4 mb-10 my-0'>{formatCurrency(product?.Product_Price || 0)} đ</p>
                            <div className='flex gap-5 items-center justify-center'>
                                <MinusCircleFilled className='btn_quantity h-[30px] w-[30px]' style={{ color: `${quantity > 1 ? '#fa8c16' : '#e5e5e5'}` }} onClick={() => handleChangeQuatity('minus')} />
                                <p className='text-[18px] my-0' >{quantity}</p>
                                <PlusCircleFilled className='btn_quantity h-[30px] w-[30px]' onClick={() => handleChangeQuatity('plus')} style={{ color: '#fa8c16' }} />
                            </div>
                        </div>
                        <div className='border-[#c9c9c9] border-[1px] rounded-[5px] h-[46px] flex overflow-hidden mt-4'>
                            <div className='flex bg-[#f5f5f5] py-4 px-3'>
                                <ProfileFilled style={{ color: '#e5e5e5', fontSize: '20px' }} />
                            </div>
                            <input className='h-[100%] mx-3 w-[100%] outline-none text-[14px]' placeholder='Ghi chú thêm cho món này' />
                        </div>
                        {size.length > 0 && <div>
                            <p className='mb-3 text-[13px] text-[#666] my-2 p-2 bg-[#EDEDED] font-[500]'>CHỌN SIZE (BẮT BUỘC)</p>
                            <div className='flex gap-4 flex-wrap'>
                                <Radio.Group name="size" defaultValue={1} value={sizeName} className='flex justify-between w-[100%]' onChange={(e) => handleChangeOptionTopping(e.target.value)}>
                                    {size.map(item => <Radio value={item.name}>{item.name} <br /> + {item.price}đ</Radio>)}
                                </Radio.Group>
                            </div>
                        </div>}
                        {topping.length > 0 && <div>
                            <p className='mb-3 text-[13px] text-[#666] my-2 p-2 bg-[#EDEDED] font-[500] mt-6'>TOPPING</p>
                            <div className='flex gap-4 flex-col'>
                                {topping.map((item: toppingShow) => <div key={item.Topping_ID}><Checkbox onClick={() => clickOption("topping", item.Topping_Name)} checked={item.checked} /> <span className='pl-3 text-[14px]'>{item.Topping_Name} + {item.Topping_Price}</span></div>)}
                            </div>
                        </div>}
                    </div>
                    <div className='p-3'>
                        <button onClick={handleOrder} className='flex justify-center w-full rounded-2xl text-white bg-gradient-to-r from-orange-400 to-orange-500'>
                            <span className='text-[14px] font-[400]'>{formatCurrency(total)}đ</span>
                        </button>
                    </div>
                </Spin>
            </div>
        </div>
    );
};

export default ProductInfomation;
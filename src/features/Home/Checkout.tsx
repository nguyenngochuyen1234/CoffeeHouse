import React, { useEffect, useState } from 'react'
import { FileFilled, DeleteFilled, RightOutlined, EditOutlined } from '@ant-design/icons';
import { Col, Row, Input, Divider, Checkbox, Radio, RadioChangeEvent, Card, Space, Button, Spin } from 'antd';
import deliveryImg from '@/assets/images/checkout/Delivery2.png'
import orderApi from '@/api/orderApi';
import { Toppings, orderDetailsProduct } from '@/models/order';
import { formatCurrency } from '@/utils/paragraph';
import { useAuth } from '@/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductInfomation from '@/components/ProductDetail/ProductInfomation';
const Checkout = () => {
    const navigate = useNavigate()
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
    const paymentMethods = [
        {
            icon: 'https://png.pngtree.com/png-clipart/20230504/original/pngtree-money-flat-icon-png-image_9138186.png',
            name: 'Tiền mặt',
            value: 'cash'
        },
        {
            icon: 'https://www.russinvecchi.com.vn/wp-content/uploads/2020/09/931b119cf710fb54746d5be0e258ac89-logo-momo-1024x1024.png',
            name: 'MoMo',
            value: 'momo'
        },
        {
            icon: 'https://vcci-hcm.org.vn/wp-content/uploads/2022/12/1.png',
            name: 'ZaloPay',
            value: 'zalopay'
        },
        {
            icon: 'https://1.bp.blogspot.com/-EmJLucvvYZw/X0Gm1J37spI/AAAAAAAAC0s/Dyq4-ko9Eecvg0ostmowa2RToXZITkbcQCLcBGAsYHQ/w1200-h630-p-k-no-nu/Logo%2BShopeePay.png',
            name: 'ShopeePay',
            value: 'shopeepay'
        },
        {
            icon: 'https://png.pngtree.com/png-clipart/20220111/original/pngtree-blue-cartoon-e-bank-card-png-image_7090137.png',
            name: 'Thẻ ngân hàng',
            value: 'card'
        },
    ]

    const [agreeTerm, setAgreeTerm] = useState(false)
    const [payment, setPayment] = useState('cash')
    const { auth, orderDetails, setOrderDetails } = useAuth()
    const [name, setName] = useState('')
    const [adress, setAdress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showInfoProduct, setShowInfoProduct] = useState(false);
    const [idProductEdited, setIdProductEdited] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const onChangePaymentMethods = (e: RadioChangeEvent) => {
        setPayment(e.target.value);
    };
    const handleClickClose = () => {
        setShowInfoProduct(false);
        setIdProductEdited('')
    }
    const handleEditProductDetails = (id: string) => {
        setShowInfoProduct(true);
        setIdProductEdited(id)
    }
    const fetchAllOrderPoduct = async () => {
        try {
            setLoading(true)
            let res = await orderApi.getAllOrders()
            if (res.data.length > 0) {
                setOrderDetails(res.data)
            } else {
                navigate('/')
            }
            setLoading(false)

        } catch (err) {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchAllOrderPoduct()
        if (auth) {
            const { User_Name, User_PhoneNumber, User_Address } = auth
            setName(User_Name)
            setPhoneNumber(User_PhoneNumber)
            setAdress(User_Address)
        }
    }, [auth])
    const calcProduct = (itemOrder: orderDetailsProduct) => {
        let productPrice = itemOrder.Product_Price;
        let quantity = itemOrder.Order_Quantity;
        let toppingsPrice = itemOrder.Toppings.reduce((acc, topping) => acc + topping.Topping_Addition_Price, 0);
        let size = sizeProduct.find(itemSize => itemSize.name === itemOrder.Order_Size)?.price || 0
        let totalPrice = (productPrice + toppingsPrice + size) * quantity;
        return totalPrice
    }
    const calcTotalOrder = () => {
        let overallTotal = 0;
        orderDetails.forEach((itemOrder: orderDetailsProduct) => {
            let totalPrice = calcProduct(itemOrder)
            overallTotal += totalPrice;
        });
        return overallTotal || 0
    }
    const handleDeleteOrderDetails = async (idOrderDetails: string) => {
        try {
            setLoading(true)
            await orderApi.deleteOrderDetail(idOrderDetails)
            let updateOrderProduct = orderDetails.filter(item => item.Order_Detail_ID !== idOrderDetails)
            setOrderDetails(updateOrderProduct)
            if (updateOrderProduct.length === 0) {
                navigate('/')
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }
    const handleDeleteOrder = async () => {
        try {
            setLoading(true)
            if (orderDetails[0].Order_ID)
                await orderApi.deleteOrder(orderDetails[0].Order_ID)
            setLoading(false)
            navigate('/')

        } catch (err) {
            console.log(err)
        }
    }
    const handleOrder = async() => {
        try{
            setLoading(true)
            if(orderDetails[0].Order_ID){
                await orderApi.updateOrderStatus(orderDetails[0].Order_ID, 'Chờ xác nhận')
                navigate('/orders')
            }
        }finally{
            setLoading(false)
        }
    }
    const ProductDetails = ({ item }: { item: orderDetailsProduct }) => {
        let toppings = item.Toppings.map((topping: Toppings) => topping.Topping_Addition_Name).join(', ')
        return (
            <Space className='w-[100%] justify-between mb-5'>
                <Space>
                    <EditOutlined onClick={() => handleEditProductDetails(item.idProduct)} className='text-[#faa515] cursor-pointer' />
                    <div>
                        <h4 className='text14-bold'>{item.Order_Quantity} x {item.Product_Name}</h4>
                        {item.Order_Size && <><span>{item.Order_Size}</span><br /></>}
                        {toppings && <><span>{toppings}</span><br /></>}
                        <p className='cursor-pointer' onClick={() => handleDeleteOrderDetails(item.Order_Detail_ID)}>Xóa</p>
                    </div>
                </Space>
                <p>{formatCurrency(calcProduct(item))} đ</p>
            </Space>
        )
    }
    return (
        <div className='content'>
            <Spin spinning={loading}>
                {showInfoProduct &&
                    idProductEdited && <ProductInfomation onClose={handleClickClose} idProduct={idProductEdited} />}
                <div className='flex justify-center mb-5'>
                    <span> <FileFilled className='text-2xl text-[#faa515] mb-2' />
                        <span className='text-3xl'> Xác nhận đơn hàng</span>
                    </span>
                </div>
                <Row gutter={30}>
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <section className='py-3'>

                            <h1 className='text16-bold'>Giao hàng</h1>
                            <div>
                                <div className='flex py-3'>
                                    <img src={deliveryImg} className='h-10 w-10' alt="" />
                                    <div className='w-[100%]'>
                                        <div className='w-[100%] pl-3 flex justify-between'>
                                            <div>

                                                <h1 className='text14-bold'>Hà Nội</h1>
                                                <p className='text14-light'>Hà nội, Việt Nam</p>
                                            </div>
                                            <RightOutlined />
                                        </div>
                                        <Divider className='m-0' />
                                    </div>
                                </div>
                                <div className='flex py-3'>
                                    <div className='h-10 w-10'></div>
                                    <div className='w-[100%]'>
                                        <div className='w-[100%] pl-3 flex justify-between'>
                                            <div>

                                                <h1 className='text14-bold'>Nhận hàng trong ngày 15 - 30 phút</h1>
                                                <p className='text14-light'>Vào lúc: Càng sớm càng tốt</p>
                                            </div>
                                            <RightOutlined />
                                        </div>
                                        <Divider className='m-0' />
                                    </div>
                                </div>
                            </div>

                            <div className='flex gap-3 flex-col'>
                                <Input className='checkout_input' onChange={(e) => setName(e.target.value)} value={name} placeholder='Tên người nhận' />
                                <Input className='checkout_input' onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder='Số điện thoại' />
                                <Input className='checkout_input' placeholder='Thêm hướng dẫn người nhận' />
                            </div>
                        </section>
                        <section className='py-3'>
                            <div>
                                <h1 className='text16-bold'>Phương thức thanh toán</h1>
                                <Radio.Group onChange={onChangePaymentMethods} value={payment} className='text14-light w-[100%] py-5'>
                                    {paymentMethods.map((item, index) => (
                                        <div key={item.value} className="flex items-center flex-col">
                                            <Radio style={{ fontSize: '14px' }} value={item.value} className='w-[100%]'>
                                                <div className='flex flex-row items-center justify-center'>
                                                    <img className='h-8 w-[auto] mr-2 ml-4' src={item.icon} />
                                                    <h1>{item.name}</h1>
                                                </div>
                                            </Radio>
                                            {index !== paymentMethods.length - 1 && <Divider className='my-3' />}
                                        </div>
                                    ))}
                                </Radio.Group>
                            </div>
                        </section>

                        <div>
                            <Checkbox onChange={() => setAgreeTerm(!agreeTerm)} className='text-[14px]' > Đồng ý với các điều khoản và điều kiện mua hàng của The Coffee House</Checkbox>

                        </div>


                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <Card size="small" style={{ boxShadow: '0 -4px 10px rgba(0,0,0,.12)' }} title="Các món đã chọn" extra={<Button shape="round" onClick={() => navigate('/product-detail')}>Thêm món</Button>} headStyle={{ padding: '12px' }}>
                            <div className='py-5'>
                                {orderDetails.length > 0 && orderDetails.map((item: orderDetailsProduct) => <ProductDetails key={item.idProduct} item={item} />)}

                                <h1 className='text16-bold mb-6'>Tổng cộng</h1>
                                <Space className='w-[100%] justify-between'>
                                    <span>Thành tiền</span>
                                    <span>{formatCurrency(calcTotalOrder())}đ </span>
                                </Space>
                                <Divider />
                                <Space className='w-[100%] justify-between'>
                                    <span>Phí giao hàng</span>
                                    <span>18.000đ </span>
                                </Space>
                            </div>
                            <Space style={{ borderRadius: '0 0 8px 8px' }} className='w-[100%] justify-between bg-[#faa515] p-3 absolute bottom-[-60px] left-0 text-[#fff] text-[14px]'>
                                <div>
                                    <h1>Thành tiền</h1>
                                    <span className='text14-bold'>{formatCurrency(calcTotalOrder() + 18000)}đ</span>
                                </div>
                                <Button shape="round" className='text-[#fff]' onClick={handleOrder}>Đặt hàng</Button>
                            </Space>
                        </Card>
                        <div className='text-[#faa515] text-center text14-light pt-8 mt-[60px]'>
                            <DeleteFilled className='text-[18px] mr-2 cursor-pointer' onClick={handleDeleteOrder} />
                            <span>Xóa đơn hàng</span>
                        </div>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}

export default Checkout
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message, Modal, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';

// Hàm xử lý khi kết thúc đăng nhập không thành công
const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
};

const Login = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [checkEmail, setCheckEmail] = useState(false);
    const [loading, setLoading] = useState(false)
    

    // Hàm xử lý khi người dùng đăng nhập
    const onFinish = async (values:any) => {
        try {
            console.log(values)
        } catch (error) {
            
        }
    };

    // Hàm xử lý khi đóng modal quên mật khẩu
    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (<>
        {contextHolder}
        <div className='w-[100%] login-container flex justify-center items-center min-h-[100vh] py-8 flex-col'>
            <h1 className='text-[35px] font-[700]'>Đăng nhập</h1>
            <Form
                name="basic"
                style={{
                    width: 600,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên đăng nhập/ Email *"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên đăng nhập',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu *"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    style={{ marginBottom: '0px' }}
                >
                    <Checkbox>Nhớ tài khoản</Checkbox>
                </Form.Item>
                {/* Link để mở modal quên mật khẩu */}
                <Link onClick={() => setIsModalOpen(true)}>Quên mật khẩu</Link>

                <Form.Item className="my-4">
                    <Button className='btn-submit' type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
            <p>Bạn chưa có tài khoản? <Link onClick={() => navigate('/register')}>Đăng ký</Link></p>
        </div>
    </>
    );
};

export default Login;

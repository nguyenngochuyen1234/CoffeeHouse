import React from 'react';
import { Button, message, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';

// Xử lý khi việc hoàn thành form không thành công
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const Register = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    // Xử lý khi form được hoàn thành và gửi đi
    const onFinish = async (values: any) => {
        try {

            navigate('/');
        } catch (error) {

        }
    };

    return (
        <>
            {contextHolder}
            <div className='w-[100%] login-container mt-8 min-h-[100vh] flex justify-center items-center py-8 flex-col'>
                {/* Component để hiển thị thông báo */}
                <h1 className='text-[35px] font-[700]'>Đăng ký tài khoản</h1>
                {/* Form đăng ký */}
                <Form
                    name="basic"
                    style={{
                        width: 600,
                    }}
                    // Xử lý khi form được hoàn thành và gửi đi
                    onFinish={onFinish}
                    // Xử lý khi việc hoàn thành form không thành công
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Tên đăng nhập *"
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
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập địa chỉ',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tạo mật khẩu"
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
                    <Form.Item className="my-4">
                        <Button type="primary" htmlType="submit" className='btn-submit'>
                            Tạo tài khoản
                        </Button>
                    </Form.Item>
                </Form>
                {/* Link để chuyển hướng đến trang đăng nhập */}
                <p>Bạn đã có tài khoản? <Link onClick={() => navigate('/login')}>Đăng nhập</Link></p>
            </div>
        </>
    );
};

export default Register;

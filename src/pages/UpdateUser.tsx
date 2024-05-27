import React, { useState } from 'react';
import { Button, message, Form, Input } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
import authApi from '@/api/auth';

// Xử lý khi việc hoàn thành form không thành công
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const UpdateUser = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    // Xử lý khi form được hoàn thành và gửi đi
    const onFinish = async (values: any) => {
        try {
            setLoading(true)
            let response = await authApi.register({ ...values, role: 'user' })
            console.log({ response })
            setLoading(false)
            // navigate('/');
        } catch (error) {
            setLoading(false)
            console.log({ error })
        }
    };

    return (
        <>
            {contextHolder}
            <div className='w-[100%] login-container mt-8 min-h-[100vh] flex justify-center items-center py-8 flex-col'>
                <h1 className='text-[35px] font-[700]'>Cập nhật thông tin</h1>
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
                    disabled={loading}
                >

                    <Form.Item
                        label="Tên đăng nhập *"
                        name="User_Name"
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
                        name="User_Email"
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
                        name="User_Address"
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
                        name="User_PhoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item className="my-4">
                        <Button type="primary" htmlType="submit" className='btn-submit' loading={loading}>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default UpdateUser;

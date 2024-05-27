import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import typeProductsApi from '@/api/typeProductsApi';
import { menu, menuRow, typeProductsRows } from '@/models';
import menuApi from '@/api/menuApi';
import toppingApi from '@/api/toppingApi';
import { toppingRow } from '@/models/topping';


export interface ModalToppingProps {
    isModalOpen: boolean
    setIsModalOpen: (newValue: boolean) => void
    setDataSource: React.Dispatch<React.SetStateAction<toppingRow[]>>
    idTopping: string | null
}
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 20 },
};

const ModalTopping: React.FC<ModalToppingProps> = ({ isModalOpen, setIsModalOpen, setDataSource, idTopping }) => {

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                if (idTopping) {
                    const res = await toppingApi.getToppingById(idTopping);
                    console.log({res})
                    if (res.data) {
                        form.setFieldsValue({
                            Topping_Name: res.data[0].Topping_Name || '',
                            Topping_Price: res.data[0].Topping_Price || '',
                        });
                    }
                } else {
                    form.setFieldsValue({
                        Topping_Name: '',
                    });

                }
            } catch (error) {
                // Handle error if needed
                console.error("Error fetching menu:", error);
            }
        };

        fetchMenu();
    }, [idTopping]);


    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            if (!idTopping) {
                //add
                let response = await toppingApi.addTopping(values)
                console.log({response})
                setDataSource((prev: toppingRow[]) => [...prev, {
                    Topping_ID: response?.data.Topping_ID,
                    ...values
                }])
            } else {
                let updateRow = {
                    Topping_ID: idTopping,
                    Topping_Name: values.Topping_Name,
                    Topping_Price: values.Topping_Price,
                }
                await toppingApi.updateTopping(idTopping,updateRow)
                setDataSource((prev: toppingRow[]) => prev.map(row => row.Topping_ID === idTopping ? {
                    ...updateRow, key: idTopping
                } : row))
            }
            setIsModalOpen(false)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };


    const handleCancel = () => {
        console.log('Clicked cancel button');
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title={!idTopping ? "Thêm menu" : "Sửa menu"}
                open={isModalOpen}
                onOk={onCheck}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form form={form} name="dynamic_rule" style={{ maxWidth: 600 }}>
                    <Form.Item
                        {...formItemLayout}
                        name="Topping_Name"
                        label="Tên topping"

                        rules={[{ required: true, message: 'Vui lòng nhập' }]}
                    >
                        <Input placeholder="Nhập tên topping" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="Topping_Price"
                        label="Giá topping"

                        rules={[{ required: true, message: 'Vui lòng nhập' }]}
                    >
                        <Input placeholder="Nhập giá topping" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalTopping;
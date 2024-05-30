import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import typeProductsApi from '@/api/typeProductsApi';
import { menu, menuRow, typeProductsRows } from '@/models';
import menuApi from '@/api/menuApi';


export interface ModalMenuProductProps {
    isModalOpen: boolean
    setIsModalOpen: (newValue: boolean) => void
    setDataSource: React.Dispatch<React.SetStateAction<menuRow[]>>
    idMenu: string | null
}
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 20 },
};

const ModalMenuProduct: React.FC<ModalMenuProductProps> = ({ isModalOpen, setIsModalOpen, setDataSource, idMenu }) => {

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setConfirmLoading(true)
                if (idMenu) {
                    
                    const res = await menuApi.getMenuById(idMenu);
                    if (res.data) {
                        form.setFieldsValue({
                            Name_Menu: res.data.Name_Menu || '',
                        });
                    }
                } else {
                    form.setFieldsValue({
                        Name_Menu: '',
                    });
                }
            } catch (error) {
                // Handle error if needed
                console.error("Error fetching menu:", error);
            }finally{
                setConfirmLoading(false)
            }
        };

        fetchMenu();
    }, [idMenu]);


    const onCheck = async () => {
        try {
            setConfirmLoading(true)
            const values = await form.validateFields();
            if (!idMenu) {
                //add
                let response = await menuApi.addMenu(values)
                console.log({response})
                setDataSource((prev: menuRow[]) => [...prev, {
                    Menu_ID: response?.data.Menu_ID,
                    ...values
                }])
            } else {
                let updateRow = {
                    Menu_ID: idMenu,
                    Name_Menu: values.Name_Menu,
                }
                await menuApi.updateMenu(updateRow)
                setDataSource((prev: menuRow[]) => prev.map(row => row.Menu_ID === idMenu ? {
                    ...updateRow, key: idMenu
                } : row))
            }
            setIsModalOpen(false)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }finally{
            setConfirmLoading(false)
        }
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title={!idMenu ? "Thêm menu" : "Sửa menu"}
                open={isModalOpen}
                onOk={onCheck}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form form={form} name="dynamic_rule" style={{ maxWidth: 600 }}>
                    <Form.Item
                        {...formItemLayout}
                        name="Name_Menu"
                        label="Tên menu"

                        rules={[{ required: true, message: 'Vui lòng nhập' }]}
                    >
                        <Input placeholder="Nhập tên menu" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalMenuProduct;
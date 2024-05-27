import React, { useState, useEffect } from 'react';
import { Select, Modal, Form, Input, Upload, Button, message, Space, Divider } from 'antd';
import type { SelectProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import typeProductsApi from '@/api/typeProductsApi';
import ReactQuill from "react-quill";
import { productsRow, typeProducts } from '@/models';
import { AnyObject } from 'antd/es/_util/type';
import productsApi from '@/api/productsApi';
import { STATIC_HOST } from '@/common';
import { topping } from '@/models/topping';
import toppingApi from '@/api/toppingApi';

interface ProductsApiResponse {
    id: number;
}
export interface ModalProductsProps {
    dataSource: productsRow[]
    isModalOpen: boolean
    setIsModalOpen: (newValue: boolean) => void
    setDataSource: React.Dispatch<React.SetStateAction<productsRow[]>>
    dataRow: AnyObject | null
}
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 25 },
};

const ModalProducts: React.FC<ModalProductsProps> = ({ isModalOpen, setIsModalOpen, setDataSource, dataRow, dataSource }) => {
    const handleChange = (value: string[]) => {
        setToppingSelected(value)
    };

    const [ProductsImage, setProductsImage] = useState('')
    const props = {
        action: `${STATIC_HOST}uploads`,
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setProductsImage(info.file.response.filename)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const [checkNick, setCheckNick] = useState(false);
    const [typeProducts, settypeProducts] = useState<typeProducts[]>([])
    const [topping, setTopping] = useState<SelectProps['options']>([])
    const [toppingSelected, setToppingSelected] = useState<string[]>([])
    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick, form]);

    useEffect(() => {
        if (dataRow) {
            form.setFieldsValue({
                TypeProduct_ID: dataRow.TypeProduct_ID || '',
                TypeProduct_Name: dataRow.TypeProduct_Name || '',
                Product_Name: dataRow.Product_Name || '',
                Product_Price: dataRow.Product_Price || '',
                Product_Image: [{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: dataRow?.Product_Image || ''
                }],
                Product_Description: dataRow.Product_Description || ''
            });
        }
    }, [dataRow, form]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await typeProductsApi.getAllTypeProduct()
                const toppingData = await toppingApi.getAllTopping()
                if (response?.data) {
                    settypeProducts(response.data)
                }
                if (toppingData?.data) {
                    let optionsTopping = toppingData.data.map((topping: topping) => {
                        return {
                            label: topping.Topping_Name,
                            value: topping.Topping_ID,
                            emoji: topping.Topping_Name,
                            desc: topping.Topping_Price,
                        }
                    })
                    setTopping(optionsTopping)
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, [])

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            let link_image = ProductsImage

            console.log(dataRow?.idProduct)
            if (!link_image?.includes(STATIC_HOST)) {
                link_image = `${STATIC_HOST}uploads/${ProductsImage}`
            }
            const dataProduct = {
                ...values,
                Product_Image: link_image,
                Product_Price: parseFloat(values.Product_Price)
            }
            if (!dataRow?.idProduct) {
                let response = await productsApi.addProduct(dataProduct)
                if (response.data.id) {
                    let id = response.data.id
                    let typeProductName = typeProducts.find(item => item.TypeProduct_ID == dataProduct.TypeProduct_Name)
                    let dataUpdate = [...dataSource, { ...dataProduct, key: id, idProduct: id, TypeProduct_Name: typeProductName?.TypeProduct_Name }]
                    console.log(id)
                    setDataSource(dataUpdate)
                }
            } else {
                let id = dataRow.idProduct
                let link_image_Update = dataRow.Product_Image

                if (!link_image_Update.includes(STATIC_HOST)) {
                    link_image_Update = `${STATIC_HOST}uploads/${dataRow.Product_Image}`
                }
                let updateProduct = { ...dataProduct, idProduct: id, Product_Image: link_image_Update }
                let response = await productsApi.updateProduct(id, updateProduct)
                let updateData = dataSource.map((row: productsRow) => row.idProduct === id ? {
                    ...dataProduct, key: id, Product_Image: link_image_Update, Product_Price: parseFloat(dataProduct.Product_Price), idProduct: id
                } : row)
                setDataSource(updateData)
                for (const item of toppingSelected) {
                    await toppingApi.productTopping({
                        Topping_ID: item,
                        idProduct: id
                    });
                }
                
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
                title={!dataRow?.Product_Name ? "Thêm sản phẩm" : "Sửa sản phẩm"}
                open={isModalOpen}
                onOk={onCheck}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={800}
            >
                <Form form={form} initialValues={{ TypeProduct_Name: dataRow?.TypeProduct_Name || '' }} name="dynamic_rule" style={{ maxWidth: 800 }}>


                    <Form.Item
                        {...formItemLayout}
                        label="loại sản phẩm"
                        name="TypeProduct_ID"
                        rules={[{ required: true, message: 'Vui lòng chọn' }]}
                    >
                        <Select>
                            {typeProducts?.map(item => <Select.Option key={item.TypeProduct_ID} value={item.TypeProduct_ID}>{item.TypeProduct_Name}</Select.Option>)}

                        </Select>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="Product_Name"
                        label="Tên sản phẩm"

                        rules={[{ required: true, message: 'Vui lòng nhập' }]}
                    >
                        <Input placeholder="Nhập tên sản phẩm" />
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="Product_Price"
                        label="Giá bán"

                        rules={[{ required: true, message: 'Vui lòng nhập' }]}
                    >
                        <Input type='number' placeholder="Nhập giá bán" />
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="Product_Image"
                        label="Ảnh sản phẩm"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Vui lòng nhập' }]}
                    >
                        <Upload listType="picture" name='image' maxCount={1} {...props}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="Product_Description"
                        label="Mô tả"

                        rules={[{ required: true, message: 'Vui lòng nhập' }]}
                    >
                        <Input placeholder="Nhập mô tả" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Topping"
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Lựa chọn topping"
                            onChange={handleChange}
                            options={topping}
                            optionRender={(option) => (
                                <Space>
                                    <span role="img" aria-label={option.data.label}>
                                        {option.data.emoji}
                                    </span>
                                    {option.data.desc}
                                </Space>
                            )}
                        />
                    </Form.Item>

                </Form>

            </Modal >
        </>
    );
};

export default ModalProducts;
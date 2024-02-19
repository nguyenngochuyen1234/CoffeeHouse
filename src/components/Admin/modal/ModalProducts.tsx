import React, { useState, useEffect } from 'react';
import { Select, Modal, Form, Input, Upload, Button, message, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import typeProductsApi from '@/api/typeProductsApi';
import ReactQuill from "react-quill";
import { productsRow, typeProducts } from '@/models';
import { AnyObject } from 'antd/es/_util/type';
import productsApi from '@/api/productsApi';

interface ProductsApiResponse { 
    id: number;
}
export interface ModalProductsProps {
    isModalOpen: boolean
    setIsModalOpen: (newValue: boolean) => void
    setDataSource: React.Dispatch<React.SetStateAction<productsRow[]>>
    dataRow: AnyObject | null
}
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 25 },
};

const ModalProducts: React.FC<ModalProductsProps> = ({ isModalOpen, setIsModalOpen, setDataSource, dataRow }) => {
    const [ProductsImage, setProductsImage] = useState('')
    const props = {
        action: 'http://localhost:8800/api/upload',
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
    

    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick, form]);

    useEffect(() => {
        if (dataRow) {
            form.setFieldsValue({
                TypeProduct_ID: dataRow.TypeProduct_ID || '',
            });
        }
    }, [dataRow, form]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await typeProductsApi.getAllTypeProduct    ()
                if (response?.data) {
                    settypeProducts(response.data)
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
            let dt = {
                ...values,
                Product_Image:ProductsImage,
            }
            // await productsApi.addProduct(dt)
            // console.log("Data:", { data })
            if (!dataRow?.Product_ID) {
                // add
                let response = await productsApi.addProduct(dt)
                let data:ProductsApiResponse = response.data
                setDataSource((prev: productsRow[]) => [...prev, {
                  key: data.id,
                  idProduct: dt.id.toString(),
                  Product_Name: values.Product_Name,
                  Product_Image: values.Product_Image,
                  Product_Price: values.Product_Price,
                  TypeProduct_ID: values.TypeProduct_ID,
                  Product_Description: values.Product_Description,
                }])
            } else {
                let id = dataRow.Product_ID
                let updateRow = {
                    idProduct: dt.id.toString(),
                    Product_Name: values.Product_Name,
                    Product_Image: values.Product_Image,
                    Product_Price: values.Product_Price,
                    TypeProduct_ID: values.TypeProduct_ID,
                    Product_Description: values.Product_Description,
                }
                await productsApi.updateProduct(updateRow)
                setDataSource((prev: productsRow[]) => prev.map(row=>row.idProduct === id ? {
                  ...updateRow, key:id
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
                        name="TypeProduct_Name"
                        rules={[{ required: true, message: 'Vui lòng chọn' }]}
                    >
                        <Select>
                            {typeProducts?.map(item => <Select.Option value={item.TypeProduct_ID}>{item.TypeProduct_Name}</Select.Option>)}

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

                </Form>
            </Modal >
        </>
    );
};

export default ModalProducts;
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import typeProductsApi from '@/api/typeProductsApi';
import { typeProductsRows } from '@/models';
import { AnyObject } from 'antd/es/_util/type';

interface TypeProductsApiResponse {
  id: string;
}
export interface ModalTypeProductsProps {
  isModalOpen: boolean
  setIsModalOpen: (newValue: boolean) => void
  setDataSource: React.Dispatch<React.SetStateAction<typeProductsRows[]>>
  dataRow: AnyObject | null
}
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 20 }, 
};

const ModalTypeProducts: React.FC<ModalTypeProductsProps> = ({ isModalOpen, setIsModalOpen, setDataSource, dataRow }) => {

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);

  useEffect(() => {
    form.validateFields(['nickname']);
  }, [checkNick, form]);

  useEffect(() => {
    if (dataRow) {
      form.setFieldsValue({
        TypeProduct_Name: dataRow.TypeProduct_Name || '',
      });
    }
  }, [dataRow, form]);

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      if(!dataRow?.TypeProduct_Name){
        //add
        let response = await typeProductsApi.addTypeProduct(values)
        let data:TypeProductsApiResponse = response.data
        setDataSource((prev: typeProductsRows[]) => [...prev, {
          key: data.id,
          TypeProduct_ID: data.id.toString(),
          TypeProduct_Name: values.TypeProduct_Name,
          TypeProduct_Img: values.TypeProduct_Img,
        }])
      }else{
        let id = dataRow.TypeProduct_ID
        let updateRow = {
            TypeProduct_ID: id,
            TypeProduct_Name: values.TypeProduct_Name,
            TypeProduct_Img: values.TypeProduct_Img,
          }
        await typeProductsApi.updateTypeProduct(updateRow)
        setDataSource((prev: typeProductsRows[]) => prev.map(row=>row.TypeProduct_ID === id ? {
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
        title={!dataRow?.TypeProduct_Name ?"Thêm loại sản phẩm":"Sửa loại sản phẩm"}
        open={isModalOpen}
        onOk={onCheck}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} initialValues={{TypeProduct_Name:dataRow?.TypeProduct_Name || ''}} name="dynamic_rule" style={{ maxWidth: 600 }}>
          <Form.Item
            {...formItemLayout}
            name="TypeProduct_Name"
            label="Tên loại sản phẩm"
            
            rules={[{ required: true, message: 'Vui lòng nhập' }]}
          >
            <Input placeholder="Nhập tên loại sản phẩm" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="TypeProduct_Img"
            label="Link ảnh"
            
            rules={[{ required: true, message: 'Vui lòng nhập' }]}
          >
            <Input placeholder="Nhập link ảnh" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalTypeProducts;
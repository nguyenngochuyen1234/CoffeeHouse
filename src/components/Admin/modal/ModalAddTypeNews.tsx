import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import typeNewsApi from '@/api/typeNewsApi';
import { typeNewsRows } from '@/models';
import { AnyObject } from 'antd/es/_util/type';

interface TypeNewsApiResponse {
  id: number;
} 
export interface ModalAddTypeNewsProps {
  isModalOpen: boolean
  setIsModalOpen: (newValue: boolean) => void
  setDataSource: React.Dispatch<React.SetStateAction<typeNewsRows[]>>
  dataRow: AnyObject | null
}
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 20 },
};

const ModalAddTypeNews: React.FC<ModalAddTypeNewsProps> = ({ isModalOpen, setIsModalOpen, setDataSource, dataRow }) => {

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);

  useEffect(() => {
    form.validateFields(['nickname']);
  }, [checkNick, form]);

  useEffect(() => {
    if (dataRow) {
      form.setFieldsValue({
        TypeNews_Name: dataRow.TypeNews_Name || '',
      });
    }
  }, [dataRow, form]);

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      if(!dataRow?.TypeNews_Name){
        //add
        let response = await typeNewsApi.AddTypeNews(values)
        let data:TypeNewsApiResponse = response.data
        setDataSource((prev: typeNewsRows[]) => [...prev, {
          key: data.id,
          TypeNews_ID: data.id.toString(),
          TypeNews_Name: values.TypeNews_Name,
        }])
      }else{
        let id = dataRow.TypeNews_ID
        let updateRow = {
            TypeNews_ID: id,
            TypeNews_Name: values.TypeNews_Name,
            
          }
        await typeNewsApi.UpdateTypeNews(updateRow)
        setDataSource((prev: typeNewsRows[]) => prev.map(row=>row.TypeNews_ID === id ? {
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
        title={!dataRow?.TypeNews_Name ?"Thêm loại tin tức":"Sửa loại tin tức"}
        open={isModalOpen}
        onOk={onCheck}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} initialValues={{TypeNews_Name:dataRow?.TypeNews_Name || ''}} name="dynamic_rule" style={{ maxWidth: 600 }}>
          <Form.Item
            {...formItemLayout}
            name="TypeNews_Name"
            label="Tên loại tin tức"
            
            rules={[{ required: true, message: 'Vui lòng nhập' }]}
          >
            <Input placeholder="Nhập tên loại tin tức" />
          </Form.Item>
          
        </Form> 
      </Modal>
    </>
  );
};

export default ModalAddTypeNews;
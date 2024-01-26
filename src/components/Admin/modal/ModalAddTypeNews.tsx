import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import PropTypes from "prop-types";
import typeNewsApi from '@/api/typeNewsApi';
import { typeNewsRows } from '@/models';

export interface ModalAddTypeNewsProps {
  isModalOpen: boolean
  setIsModalOpen: (newValue: boolean) => void
  setDataSource: React.Dispatch<React.SetStateAction<typeNewsRows[]>>
}
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 20 },
};

const ModalAddTypeNews: React.FC<ModalAddTypeNewsProps> = ({ isModalOpen, setIsModalOpen, setDataSource }) => {

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);

  useEffect(() => {
    form.validateFields(['nickname']);
  }, [checkNick, form]);

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      let dt = await typeNewsApi.AddTypeNews(values)

      setDataSource((prev: typeNewsRows[]) => [...prev, {
        key: values.TypeNews_Name,
        TypeNews_ID: values.TypeNews_Name,
        TypeNews_Name: values.TypeNews_Name,
      }])
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
        title="Thêm loại tin tức"
        open={isModalOpen}
        onOk={onCheck}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} name="dynamic_rule" style={{ maxWidth: 600 }}>
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
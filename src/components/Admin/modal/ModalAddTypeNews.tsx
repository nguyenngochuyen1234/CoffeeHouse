import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import PropTypes from "prop-types";


export interface ModalAddTypeNewsProps {
  isModalOpen: boolean
  setIsModalOpen: (newValue: boolean) => void
  // items: Array<{ label: string; nav: string }>
}
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 20 },
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};


const ModalAddTypeNews: React.FC<ModalAddTypeNewsProps> = ({ isModalOpen, setIsModalOpen }) => {

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);

  useEffect(() => {
    form.validateFields(['nickname']);
  }, [checkNick, form]);

  const onCheckboxChange = (e: { target: { checked: boolean } }) => {
    setCheckNick(e.target.checked);
  };

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
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
            name="username"
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
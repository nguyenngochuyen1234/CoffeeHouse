import React, { useState, useEffect } from 'react';
import { Select, Modal, Form, Input } from 'antd';
import typeProductsApi from '@/api/typeProductsApi';
import { menu, typeProductsRows } from '@/models';
import { AnyObject } from 'antd/es/_util/type';
import menuApi from '@/api/menuApi';

interface TypeProductsApiResponse {
  TypeProduct_ID: string;
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

  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const [menu, setMenu] = useState<menu[]>([])


  const fetchDataMenu = async () => {
    try {
      setloading(true)
      let res = await menuApi.getAllmenu()
      if (res?.data) {
        setMenu(res.data)
      }
    } catch {

    } finally {
      setloading(false)

    }
  }
  useEffect(() => {
    fetchDataMenu()
    if (dataRow) {
      form.setFieldsValue({
        TypeProduct_Name: dataRow.TypeProduct_Name || '',
        Menu_ID:dataRow.Menu_ID || '',
        TypeProduct_Img:dataRow.TypeProduct_Img || ''
      });
    }
  }, [dataRow, form]);

  const onCheck = async () => {
    try {
      setloading(true)
      const values = await form.validateFields();
      let menuData = menu.find(item => item.Menu_ID === values.Menu_ID)
      if (!dataRow?.TypeProduct_Name) {
        //add
        let response = await typeProductsApi.addTypeProduct({ ...values, Menu_ID: menuData?.Menu_ID })
        let data: TypeProductsApiResponse = response.data
        if (menuData && data?.TypeProduct_ID) {
          setDataSource((prev: typeProductsRows[]) => {
            return [...prev, {
              key: data?.TypeProduct_ID,
              TypeProduct_ID: data?.TypeProduct_ID.toString(),
              TypeProduct_Name: values.TypeProduct_Name,
              TypeProduct_Img: values.TypeProduct_Img,
              Menu_ID: menuData?.Menu_ID,
              Name_Menu: menuData?.Name_Menu,
            }]
          })
        }
      } else {
        let id = dataRow.TypeProduct_ID
        if (menuData) {
          let updateRow = {
            TypeProduct_ID: id,
            TypeProduct_Name: values.TypeProduct_Name,
            TypeProduct_Img: values.TypeProduct_Img,
            Menu_ID: menuData?.Menu_ID,
            Name_Menu: menuData?.Name_Menu,
          }
          let idx = await typeProductsApi.updateTypeProduct(updateRow)
          setDataSource((prev: typeProductsRows[]) => prev.map(row => row.TypeProduct_ID === id ? {
            ...updateRow, key: id
          } : row))
        }
      }
      setIsModalOpen(false)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }finally{
      setloading(false)
    }
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={!dataRow?.TypeProduct_Name ? "Thêm loại sản phẩm" : "Sửa loại sản phẩm"}
        open={isModalOpen}
        onOk={onCheck}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <Form form={form} initialValues={{ TypeProduct_Name: dataRow?.TypeProduct_Name || '' }} name="dynamic_rule" style={{ maxWidth: 600 }} disabled={loading}>
          <Form.Item
            {...formItemLayout}
            label="Menu"
            name="Menu_ID"
            rules={[{ required: true, message: 'Vui lòng chọn' }]}
          >
            <Select>
              {menu?.map(item => <Select.Option key={item.Menu_ID} value={item.Menu_ID}>{item.Name_Menu}</Select.Option>)}

            </Select>
          </Form.Item>
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
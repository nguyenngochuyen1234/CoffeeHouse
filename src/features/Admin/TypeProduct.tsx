import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { AnyObject } from 'antd/es/_util/type';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import typeProductsApi from '@/api/typeProductsApi';
import { typeProducts, typeProductsRows } from '@/models';
import ModalTypeProducts from '@/components/Admin/modal/ModalTypeProducts';

const EditableContext = React.createContext<FormInstance<any> | null>(null);




type EditableTableProps = Parameters<typeof Table>[0];




type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const TypeProduct: React.FC = () => {
  const [dataSource, setDataSource] = useState<typeProductsRows[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataRow, setDataRow] = useState<AnyObject | null>(null);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await typeProductsApi.getAllTypeProduct();
        if (response?.data) {
          let dt = response.data.map((item: typeProducts) => {
            return {
              key: item.TypeProduct_ID,
              ...item
            }
          })
          setDataSource(dt)
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [])

  const handleEdit = (record: AnyObject) => {
    setDataRow(record)
    setIsModalOpen(true)
  }

  const handleDelete = async (key: string) => {
    try {
      setLoading(true)
      const newData = dataSource.filter((item) => item.key !== key);
      setDataSource(newData);
      await typeProductsApi.deleteTypeProduct(key)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'ID',
      dataIndex: 'TypeProduct_ID',
      width: '170px',
    },
    {
      title: 'Tên loại sản phẩm',
      dataIndex: 'TypeProduct_Name',
    },
    {
      title: 'Link ảnh',
      dataIndex: 'TypeProduct_Img',
    },
    {
      title: 'Thuộc menu',
      dataIndex: 'Name_Menu',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      width: "110px",
      render: (_, record: AnyObject) =>
        dataSource.length >= 1 ? (
          <div className='flex gap-4'>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <DeleteOutlined className='text-[red] text-[18px]' />
            </Popconfirm>
            <EditOutlined onClick={() => handleEdit(record)} className='text-[18px] text-[#1677ff] cursor-pointer' />
          </div>
        ) : null,
    },
  ];

  const handleAdd = () => {
    setDataRow({})
    setIsModalOpen(true)
  };

  const handleSave = (row: typeProductsRows) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };



  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: typeProductsRows) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <ModalTypeProducts isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setDataSource={setDataSource} dataRow={dataRow} />
      <Button className='my-4 absolute top-[1px]' type="primary" icon={<PlusOutlined />} onClick={handleAdd} >
        Tạo mới
      </Button>
      <Table
        loading={loading}
        className='mt-3'
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default TypeProduct;

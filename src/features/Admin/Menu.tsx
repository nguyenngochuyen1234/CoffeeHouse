import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { AnyObject } from 'antd/es/_util/type';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { menu, menuRow } from '@/models';
import menuApi from '@/api/menuApi';
import ModalMenuProduct from '@/components/Admin/modal/ModalMenuProduct';

const EditableContext = React.createContext<FormInstance<any> | null>(null);


interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};


type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: string;
  Menu_ID: string;
  Name_Menu: string;

}


type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const Menu: React.FC = () => {
  const [dataSource, setDataSource] = useState<menuRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idMenu, setIdMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await menuApi.getAllmenu();
        if (response?.data) {
          let dt = response.data.map((item: menu) => {
            return {
              key: item.Menu_ID,
              ...item
            }
          })
          setDataSource(dt)
        }
        console.log({ response })
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [])

  const handleEdit = (id: string) => {
    setIdMenu(id)
    setIsModalOpen(true)
  }

  const handleDelete = async (key: string) => {
    try {
      setLoading(true)
      const newData = dataSource.filter((item) => item.key !== key);
      setDataSource(newData);
      console.log({ key })
      await menuApi.deleteMenu(key)
    } catch (err) {
      console.error(err)
    } finally{
      setLoading(false)
    }
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'ID',
      dataIndex: 'Menu_ID',
      width: '170px',
    },
    {
      title: 'Tên Menu',
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
            <EditOutlined onClick={() => handleEdit(record.key)} className='text-[18px] text-[#1677ff] cursor-pointer' />
          </div>
        ) : null,
    },
  ];

  const handleAdd = () => {
    setIdMenu('')
    setIsModalOpen(true)
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
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
      <ModalMenuProduct isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setDataSource={setDataSource} idMenu={idMenu} />
      <Button className='my-4 absolute top-[1px]' type="primary" icon={<PlusOutlined />} onClick={handleAdd} >
        Tạo mới
      </Button>
      <Table
        loading={loading}
        className='mt-3'
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default Menu;

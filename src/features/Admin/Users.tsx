import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { AnyObject } from 'antd/es/_util/type';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import typeNewsApi from '@/api/typeNewsApi';
import { typeNews, typeNewsRows } from '@/models';
import ModalAddTypeNews from '@/components/Admin/modal/ModalAddTypeNews';
import toppingApi from '@/api/toppingApi';
import { topping, toppingRow } from '@/models/topping';

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

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;

}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,

  ...restProps
}) => {
  const form = useContext(EditableContext)!;



  let childNode = children;

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];


type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const Topping: React.FC = () => {
  const [dataSource, setDataSource] = useState<toppingRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataRow, setDataRow] = useState<AnyObject | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await toppingApi.getAllTopping()
        if (response?.data) {
          let dt = response.data.map((item: topping) => {
            return {
              key: item.Topping_ID,
              ...item
            }
          })
          setDataSource(dt)
        }
        console.log({ response })
      } catch (err) {
        console.error('Error fetching data:', err);
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
      const newData = dataSource.filter((item) => item.key !== key);
      setDataSource(newData);
      await toppingApi.deleteTopping(key)
    } catch (err) {
      console.error(err)
    }
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'ID',
      dataIndex: 'Topping_ID',
      width: '150px',
    },
    {
      title: 'Tên topping',
      dataIndex: 'Topping_Name',
    },
    {
      title: 'Giá topping',
      dataIndex: 'Topping_Price',
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

  const handleSave = (row: toppingRow) => {
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
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: toppingRow) => ({
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
      <Table
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

export default Topping;

import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { AnyObject } from 'antd/es/_util/type';
import { DeleteOutlined, EditOutlined,PlusOutlined } from '@ant-design/icons';
import typeNewsApi from '@/api/typeNewsApi';
import { typeNews } from '@/models';
import ModalAddTypeNews from '@/components/Admin/modal/ModalAddTypeNews';

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
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);



  const save = async () => {
    try {
      const values = await form.validateFields();

    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: number;
  TypeNews_ID: string;
  TypeNews_Name: string;

}


type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const TypeNews: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await typeNewsApi.getAllTypeNews();
        if(response?.data){
          let dt = response.data.map((item:typeNews)=>{
            return{
              key:item.TypeNews_ID,
              ...item
            }
          })
          console.log({dt})
          setDataSource(dt)
        }
        console.log({response})
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [])

  const handleDelete = async(key: number) => {
    try{
      const newData = dataSource.filter((item) => item.key !== key);
      setDataSource(newData);
      await typeNewsApi.deleteTypeNews(key)
    }catch(err){
      console.error(err)
    }
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'ID',
      dataIndex: 'TypeNews_ID',
      width: '150px',
    },
    {
      title: 'Tên loại tin tức',
      dataIndex: 'TypeNews_Name',
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
            <EditOutlined className='text-[18px] text-[#1677ff] cursor-pointer' />
          </div>
        ) : null,
    },
  ];

  const handleAdd = () => {
    // const newData: DataType = {
    //   key: count,
    //   name: `Edward King ${count}`,
    //   age: '32',
    //   address: `London, Park Lane no. ${count}`,
    // };
    // setDataSource([...dataSource, newData]);
    // setCount(count + 1);
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
      cell: EditableCell,
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
      <ModalAddTypeNews isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <Button className='my-4' type="primary" icon={<PlusOutlined />} onClick={()=>setIsModalOpen(true)} >
        Thêm loại tin tức
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default TypeNews;

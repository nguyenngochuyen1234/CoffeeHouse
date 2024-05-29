import React, { useEffect, useState } from 'react';
import { Table, Badge, Space, Modal, Switch } from 'antd';

import orderApi from '@/api/orderApi';
const Orders: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false)
  const fetchAllOrder = async () => {
    try {
      setLoading(true)
      let response = await orderApi.getAllOrderDetailsByIdUser()
      if (response.data) {
        let updateData = response.data.map((item: DataType) => ({
          key: item.Order_ID,
          ...item,
        }))
        setData(updateData)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchAllOrder()
  }, []);

  const expandedRowRender = (record: DataType) => {
    const columns = [
      { title: 'Order Detail ID', dataIndex: 'Order_Detail_ID', key: 'Order_Detail_ID' },
      { title: 'Order Quantity', dataIndex: 'Order_Quantity', key: 'Order_Quantity' },
      { title: 'Order Size', dataIndex: 'Order_Size', key: 'Order_Size' },
      { title: 'Product Name', dataIndex: 'Product_Name', key: 'Product_Name' },
      { title: 'Product Price', dataIndex: 'Product_Price', key: 'Product_Price' },
      {
        title: 'Toppings',
        dataIndex: 'Toppings',
        key: 'Toppings',
        render: (toppings: Topping[]) => (
          <>
            {toppings.map(topping => (
              <p key={topping.Topping_Addition_Name}>
                {topping.Topping_Addition_Name}: {topping.Topping_Addition_Price}
              </p>
            ))}
          </>
        ),
      },
    ];

    const detailData = Object.values(record.Order_Details);
    return <Table columns={columns} dataSource={detailData} pagination={false} />;
  };

  const columns = [
    { title: 'Order ID', dataIndex: 'Order_ID', key: 'Order_ID' },
    { title: 'Order Date', dataIndex: 'Order_Date', key: 'Order_Date' },
    {
      title: 'Order Status',
      dataIndex: 'Order_Status',
      key: 'Order_Status',
      width: 220,
      render: (text: string, record: DataType) => (
        <>
          <Badge
            status={text === 'Đã xác nhận' ? 'success' : 'warning'}
            text={text}
            className='mr-3'
          />
        </>
      ),
    },
  ];

  return (
    <div className='content'>
      <Table
        columns={columns}
        dataSource={data}
        expandable={{ expandedRowRender }}
        loading={loading}
      />
      {contextHolder}
    </div>
  );
};

export default Orders;

interface DataType {
  Order_ID: string;
  Order_Date: string;
  Order_Status: string;
  User_ID: string;
  Order_Details: Record<string, OrderDetail>;
}

interface OrderDetail {
  Order_Detail_ID: string;
  Order_Quantity: number;
  Order_Size: string;
  Product_Name: string;
  Product_Price: number;
  Toppings: Topping[];
}

interface Topping {
  Topping_Addition_Name: string;
  Topping_Addition_Price: number;
}

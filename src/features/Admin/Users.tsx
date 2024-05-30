import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import authApi from '@/api/auth';

const Users = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await authApi.getAllUser();
        if (response?.data) {
          setDataSource(response.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }finally{
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'User_ID',
      key: 'User_ID',
    },
    {
      title: 'User Name',
      dataIndex: 'User_Name',
      key: 'User_Name',
    },
    {
      title: 'Email',
      dataIndex: 'User_Email',
      key: 'User_Email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'User_PhoneNumber',
      key: 'User_PhoneNumber',
    },
    {
      title: 'Address',
      dataIndex: 'User_Address',
      key: 'User_Address',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return (
    <div className='pt-5'>
      <h1 className='mb-5 text-center text-[25px] font-700'>Danh sách người dùng</h1>
      <Table dataSource={dataSource} columns={columns} loading={loading} />
    </div>
  );
};

export default Users;

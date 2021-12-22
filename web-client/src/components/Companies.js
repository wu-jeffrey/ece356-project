import { useEffect, useState } from 'react';
import { Table } from 'antd';

import { CompaniesApi } from '../api/Api'

export function Companies() {

  useEffect(() => {
    (async () => {
      const res = await CompaniesApi.show();
    })()
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      key: 'age',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Tesla',
      ticker: 'TSLA'
    },
    {
      key: '2',
      name: 'Apple',
      ticker: 'AAPL'
    },
  ];

  return (
    <div>
      <h2>Companies</h2>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

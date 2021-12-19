import { Table, Tag, Space } from 'antd';

export function Companies() {
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

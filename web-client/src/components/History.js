import { useEffect, useState } from 'react';
import { Card, Button, Table, Breadcrumb, Divider, Statistic, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';


export function History() {
  const params = useParams();
  const [dayStats, setDayStats] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/companies/${params.companyID}/history`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      console.log(data);
      setDayStats(data.dayStats.map((c, i) => { c['key'] = i; return c; }));
      setCompany(data.company);
    })();
  }, []);

  const columns = [
    {
      title: 'Date', dataIndex: 'date', key: 'date',
      render: (text, record) => (<Statistic value={(new Date(record?.date)).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })} valueStyle={{ fontSize: 14 }} />),
    },
    {
      title: 'Open', dataIndex: 'open', key: 'open',
      render: (text, record) => (<Statistic prefix="$" value={record?.open} valueStyle={{ fontSize: 14 }} />),
    },
    {
      title: 'Close', dataIndex: 'close', key: 'close',
      render: (text, record) => (<Statistic prefix="$" value={record?.close} valueStyle={{ fontSize: 14 }} />),
    },
    {
      title: 'Volume', dataIndex: 'volume', key: 'volume',
      render: (text, record) => (<Statistic value={record?.volume} valueStyle={{ fontSize: 14 }} />),
    },
    {
      title: 'High', dataIndex: 'high', key: 'high',
      render: (text, record) => (<Statistic prefix="$" value={record?.high} valueStyle={{ fontSize: 14 }} />),
    },
    {
      title: 'Low', dataIndex: 'low', key: 'low',
      render: (text, record) => (<Statistic prefix="$" value={record?.low} valueStyle={{ fontSize: 14 }} />),
    },
  ]

  return (
    <div>
      <h2>Stock History</h2>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/companies">Companies</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href={`/companies/${params.companyID}`}>{company?.companyName}</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Stock History</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <Table columns={columns} dataSource={dayStats} />
    </div>
  );
}

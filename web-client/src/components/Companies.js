import { useEffect, useState } from 'react';
import { Table, Button } from 'antd';

export function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/companies/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      console.log(data);
      setCompanies(data.companies.map((c, i) => { c['key'] = i; return c; }));
    })();
  }, [])

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: ' ',
      key: 'action',
      render: (text, record) => (
        <Button href={`/companies/${record.companyID}`}>Details</Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Companies</h2>
      <Table columns={columns} dataSource={companies} />
    </div>
  );
}

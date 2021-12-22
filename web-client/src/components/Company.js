import { useEffect, useState } from 'react';
import { Button, Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';

export function Company() {
  const params = useParams();
  const [company, setCompany] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/companies/${params.companyID}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      console.log(data);
      setCompany(data.company);
    })();
  }, [])

  return (
    <>
      <h2>Company Details</h2>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/companies">Companies</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {company?.companyName}
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}

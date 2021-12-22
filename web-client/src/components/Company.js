import { useEffect, useState } from 'react';
import { Card, Button, Breadcrumb, Divider } from 'antd';
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
      <h2>{company?.companyName}</h2>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/companies">Companies</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {company?.companyName}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <Card style={{ margin: 12 }} >
        <h3>Details</h3>
        <h4>Stock Symbol</h4>{company.symbol}
        <Divider />
        <h4>Sector</h4>{company.sectorName}
        <Divider />
        <h4>Industry</h4>{company.industryName}
        <Divider />
        <h4>Number of Employees</h4>{company.numberOfEmployees}
        <Divider />
        <h4>Location</h4>{company.city}, {company.stateCountry}
      </Card>

      <Card style={{ margin: 12 }} >
        <h3>CEO</h3>
        <h4>Name</h4>{company.leaderName}
        <Divider />
        <h4>Age</h4>{company.leaderAge}
        <Divider />
        <h4>Gender</h4>{company.leaderGender}
      </Card>

      <Card style={{ margin: 12 }} >
        <h3>Trade Statistics</h3>
      </Card>

      <Card style={{ margin: 12 }} >
        <h3>Fiscal Reports</h3>
      </Card>
    </>
  );
}

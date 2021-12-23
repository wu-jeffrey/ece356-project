import { useEffect, useState } from 'react';
import { Card, Button, Table, Breadcrumb, Divider, Statistic, Row, Col, Empty } from 'antd';
import { useParams } from 'react-router-dom';

export function Company() {
  const params = useParams();
  const [company, setCompany] = useState({});
  const [annualReports, setAnnualReports] = useState([]);
  const [mostRecentDayStat, setMostRecentDayStat] = useState([]);

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
      setAnnualReports(data.annualReports.map((c, i) => { c['key'] = i; return c; }));
      setMostRecentDayStat(data.mostRecentDayStat);
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
        <h2>{company?.symbol} (Most Recent Stock Info) <Button href={`/companies/${company?.companyID}/history`} style={{ float: 'right' }}>Full History</Button></h2>
        {mostRecentDayStat ? (<Row gutter={24}>
          <Col span={4}>
            <Card>
              <Statistic title="Date" value={
                (new Date(mostRecentDayStat?.date)).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
              }
                valueStyle={{ fontSize: 14 }} />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic title="Open" prefix="$" value={mostRecentDayStat?.open} valueStyle={{ fontSize: 14 }} />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic title="Close" prefix="$" value={mostRecentDayStat?.close} valueStyle={{ fontSize: 14 }} />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic title="Volume" value={mostRecentDayStat?.volume} valueStyle={{ fontSize: 14 }} />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic title="High" prefix="$" value={mostRecentDayStat?.high} valueStyle={{ fontSize: 14 }} />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic title="Low" prefix="$" value={mostRecentDayStat?.low} valueStyle={{ fontSize: 14 }} />
            </Card>
          </Col>
        </Row>) : (<Empty />)}
      </Card>


      <Card style={{ margin: 12 }} >
        <h3>Details</h3>
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
        <Divider />
        <h4>Name</h4>{company.leaderName}
        <Divider />
        <h4>Age</h4>{company.leaderAge}
        <Divider />
        <h4>Gender</h4>{company.leaderGender}
      </Card>

      <Card style={{ margin: 12 }} >
        <h3>Fiscal Reports</h3>
        <Table
          columns={[
            { title: 'Year', dataIndex: 'year', key: 'year' },
            {
              title: 'Revenue', dataIndex: 'revenue', key: 'revenue',
              render: (text, record) => (<Statistic prefix="$" value={text} valueStyle={{ fontSize: 14 }} />),
            },
            {
              title: 'Revenue Growth', dataIndex: 'revenueGrowth', key: 'revenueGrowth',
              render: (text, record) => (<Statistic suffix="%" value={text * 100} precision={2} groupSeparator='' valueStyle={{ fontSize: 14 }} />),
            },
            {
              title: 'Dividend Yield', dataIndex: 'dividendYield', key: 'dividendYield',
              render: (text, record) => (<Statistic suffix="%" value={text * 100} precision={2} groupSeparator='' valueStyle={{ fontSize: 14 }} />)
            },
            {
              title: ' ',
              key: 'action',
              render: (text, record) => (<Button href={`/annual-report/${record.annualReportID}`}>Details</Button>),
            },
          ]}
          dataSource={annualReports}
        />
      </Card>
    </>
  );
}

import { useEffect, useState } from 'react';
import { Card, Breadcrumb, Divider, Statistic } from 'antd';
import { useParams } from 'react-router-dom';

export function AnnualReport() {
  const params = useParams();
  const [report, setReport] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/annual-reports/${params.annualReportID}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      console.log(data);
      setReport(data.report);
    })();
  }, [])

  return (
    <>
      <h2>{report?.companyName}</h2>
      <h3>Annual Report {report?.year}</h3>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/companies">Companies</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href={`/companies/${report?.companyID}`}>{report?.companyName}</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{report?.year}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <Card style={{ margin: 12 }} >
        <h3>Trade Statistics</h3>
        <h4>Derp</h4>{'wtf'}
      </Card>

    </>
  );
}

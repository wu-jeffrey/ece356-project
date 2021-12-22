import { useEffect, useState } from 'react';
import { Statistic, Card, Row, Col } from 'antd';

export function Home() {
  const [companyCount, setCompanyCount] = useState([]);
  const [industryCount, setIndustryCount] = useState([]);
  const [sectorCount, setSectorCount] = useState([]);
  const [articleCount, setArticleCount] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/home', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      console.log(data);
      setCompanyCount(data.company_count);
      setIndustryCount(data.industry_count);
      setSectorCount(data.sector_count);
      setArticleCount(data.article_count);
    })();
  }, [])

  return (
    <div>
      <h2>Home</h2>
      <Row gutter={24}>
        <Col span={6}>
          <Card>
            <Statistic title="Companies Tracked" value={companyCount} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Industries Tracked" value={industryCount} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Sectors Tracked" value={sectorCount} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Analyst & Partner Articles" value={articleCount} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

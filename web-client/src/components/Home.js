import { Statistic, Card, Row, Col } from 'antd';

export function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Row gutter={24}>
        <Col span={8}>
          <Card>
            <Statistic title="Unique Companies" value={112893} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Days of market" value={365} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Analyst Ratings" value={112893} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

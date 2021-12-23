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
          'x-auth-token': localStorage.getItem('token'),
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
        <h3>{report?.year} Report</h3>
        <Divider />
        <h4>Market Cap</h4><Statistic prefix="$" value={report?.marketCap} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Revenue</h4><Statistic prefix="$" value={report?.revenue} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Revenue Growth</h4><Statistic suffix="%" value={report?.revenueGrowth * 100} precision={2} groupSeparator='' valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Cost of Revenue</h4><Statistic prefix="$" value={report?.costOfRevenue} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Gross Profit</h4><Statistic prefix="$" value={report?.grossProfit} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Operating Expenses</h4><Statistic prefix="$" value={report?.operatingExpenses} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Operating Income</h4><Statistic prefix="$" value={report?.operatingIncome} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Earnings Before Tax</h4><Statistic prefix="$" value={report?.earningsBeforeTax} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Income Tax Expense</h4><Statistic prefix="$" value={report?.incomeTaxExpense} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Total Assets</h4><Statistic prefix="$" value={report?.totalAssets} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Investments</h4><Statistic prefix="$" value={report?.investments} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Net Income</h4><Statistic prefix="$" value={report?.netIncome} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Net Debt</h4><Statistic prefix="$" value={report?.netDebt} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Net Cash Flow</h4><Statistic prefix="$" value={report?.netCashFlow} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Free Cash Flow</h4><Statistic prefix="$" value={report?.freeCashFlow} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Dividend Yield</h4><Statistic suffix="%" value={report?.dividendYield * 100} precision={2} groupSeparator='' valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Total Current Asset</h4><Statistic prefix="$" value={report?.totalCurrentAsset} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Net Profit Margin</h4><Statistic suffix="%" value={report?.netProfitMargin * 100} precision={2} groupSeparator='' valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Gross Profit Margin</h4><Statistic suffix="%" value={report?.grossProfitMargin * 100} precision={2} groupSeparator='' valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Operating Income Growth</h4><Statistic suffix="%" value={report?.operatingIncomeGrowth * 100} precision={2} groupSeparator='' valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Asset Growth</h4><Statistic suffix="%" value={report?.assetGrowth * 100} precision={2} groupSeparator='' valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Net Income Growth</h4><Statistic suffix="%" value={report?.netIncomeGrowth * 100} precision={2} groupSeparator='' valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Payables</h4><Statistic prefix="$" value={report?.payables} valueStyle={{ fontSize: 14 }} />
        <Divider />
        <h4>Total Debt</h4><Statistic prefix="$" value={report?.totalDebt} valueStyle={{ fontSize: 14 }} />
        <Divider />
      </Card>

    </>
  );
}

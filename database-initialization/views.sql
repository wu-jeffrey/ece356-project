CREATE VIEW Homepage AS
  select (select count(*) from Sectors) as sector_count,
    (select count(*) from Industries) as industry_count,
    (select count(*) from Articles) as article_count,
    (select count(*) from Companies) as company_count;

CREATE VIEW IndividualAnnualReport AS
(
  SELECT annualReportID, year, C.companyName AS companyName, C.companyID AS companyID, revenue,
    dividendYield, marketCap, grossProfit
  FROM AnnualReports AS AR
    INNER JOIN Companies AS C ON C.companyID = AR.companyID
);

CREATE VIEW InstitutionAnnualReport AS
(
  SELECT annualReportID, year, C.companyName AS companyName, C.companyID AS companyID, revenue,
    revenueGrowth, costOfRevenue, grossProfit, operatingExpenses,
    operatingIncome, earningsBeforeTax, incomeTaxExpense, totalAssets, investments,
    netIncome, netDebt, netCashFlow, freeCashFlow, dividendYield,
    totalCurrentAsset, netProfitMargin, grossProfitMargin, assetGrowth,
    operatingIncomeGrowth, netIncomeGrowth, marketCap, payables, totalDebt
  FROM AnnualReports AS AR
    INNER JOIN Companies AS C ON C.companyID = AR.companyID
);

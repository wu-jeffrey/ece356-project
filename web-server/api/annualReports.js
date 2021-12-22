const db = require('../db');
const express = require('express');

const router = express.Router();

router.get('/:annualReportID', (req, res, next) => {
  db.query(`
    SELECT revenue, revenueGrowth, costOfRevenue, grossProfit, operatingExpenses,
      operatingIncome, earningsBeforeTax, incomeTaxExpense, totalAssets, investments,
      netIncome, netDebt, netCashFlow, freeCashFlow, dividendYield,
      totalCurrentAsset, netProfitMargin, grossProfitMargin, operatingIncomeGrowth,
      assetGrowth, operatingIncomeGrowth, assetGrowth, netIncomeGrowth, marketCap,
      payables, totalDebt, year, C.companyName AS companyName, C.companyID AS companyID
    FROM AnnualReports AS AR
      INNER JOIN Companies AS C ON C.companyID = AR.companyID
    WHERE annualReportID = ${req.params.annualReportID}
    `,
    function (err, results) {
      if (err) return next(err);
      res.json({ report: results[0] });
    }
  );
});

module.exports = router;

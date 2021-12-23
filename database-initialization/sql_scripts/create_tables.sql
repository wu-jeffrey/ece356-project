CREATE TABLE Companies (
  companyID  INT NOT NULL AUTO_INCREMENT,
  symbol VARCHAR(5) UNIQUE, -- no stock tickers in the dataset have more than 5 chars
  industryID INT,
  sectorID INT,
  industryName VARCHAR(255),
  sectorName VARCHAR(255),
  city VARCHAR(255),
  stateCountry VARCHAR(255),
  yearFounded INT(4),
  numberOfEmployees INT,
  companyName VARCHAR(100),
  ipoDate DATETIME,
  PRIMARY KEY (companyID)
);

CREATE TABLE Sectors (
  sectorID  INT NOT NULL AUTO_INCREMENT,
  sectorName VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (sectorID)
);

CREATE TABLE Industries (
  industryID  INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  sectorID INT,
  sectorName VARCHAR(255),
  PRIMARY KEY (industryID),
  FOREIGN KEY (sectorID) REFERENCES Sectors(sectorID)
);

CREATE TABLE DayStats (
  dayStatID INT NOT NULL AUTO_INCREMENT,
  date DATETIME NOT NULL,
  volume INT,
  open FLOAT,
  high FLOAT,
  low FLOAT,
  close FLOAT,
  adjclose  FLOAT,
  symbol VARCHAR(5),
  companyID INT,
  fiscalYear INT(4),
  PRIMARY KEY (dayStatID),
  FOREIGN KEY (companyID) REFERENCES Companies(companyID)
  );

CREATE TABLE Leaders (
  leaderID  INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  age INT,
  gender VARCHAR(20),
  startDate INT(4),
  companyID INT,
  company VARCHAR(255),
  PRIMARY KEY (leaderID),
  FOREIGN KEY (companyID) REFERENCES Companies(companyID)
);

CREATE TABLE AnnualReports (
  annualReportID INT NOT NULL AUTO_INCREMENT,
  symbol VARCHAR(5),
  revenue FLOAT,
  revenueGrowth FLOAT,
  costOfRevenue FLOAT,
  grossProfit FLOAT,
  operatingExpenses FLOAT,
  operatingIncome FLOAT,
  earningsBeforeTax FLOAT,
  incomeTaxExpense FLOAT,
  totalAssets FLOAT,
  investments FLOAT,
  netIncome FLOAT,
  netDebt FLOAT,
  netCashFlow FLOAT,
  freeCashFlow FLOAT,
  dividendYield FLOAT,
  grossProfitMargin FLOAT,
  totalCurrentAsset FLOAT,
  netProfitMargin FLOAT,
  grossProfitGrowth FLOAT,
  operatingIncomeGrowth FLOAT,
  assetGrowth FLOAT,
  netIncomeGrowth FLOAT,
  marketCap FLOAT,
  payables FLOAT,
  totalDebt FLOAT,
  companyID INT,
  fiscalYear INT(4),
  PRIMARY KEY (annualReportID),
  FOREIGN KEY (companyID) REFERENCES Companies(companyID)
  );

CREATE TABLE Users (
  userID BIGINT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  password char(128) NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT 0,

  PRIMARY KEY (userID)
);

CREATE TABLE Articles (
  articleID INT NOT NULL AUTO_INCREMENT,
  companyID INT,
  headline VARCHAR(255),
  url VARCHAR(1000),
  publisher VARCHAR(255),
  date DATETIME,
  symbol VARCHAR(5),
  PRIMARY KEY (articleID),
  FOREIGN KEY (companyID) REFERENCES Companies(companyID)
)

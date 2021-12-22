CREATE TABLE Companies (
  companyID  int NOT NULL AUTO_INCREMENT,
  symbol VARCHAR(5) UNIQUE, -- no stock tickers in the dataset have more than 5 chars
  industryID INT,
  sectorID INT,
  industryName VARCHAR(255),
  sectorName VARCHAR(255),
  city VARCHAR(255),
  stateCountry VARCHAR(255),
  summary VARCHAR(255),
  yearFounded INT(4),
  numberOfEmployees int,
  fiscalDateEnd INT(4),
  companyName VARCHAR(100),
  PRIMARY KEY (companyID)
);

CREATE TABLE Sectors (
  sectorID  int NOT NULL AUTO_INCREMENT,
  sectorName VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(255),

  PRIMARY KEY (sectorID)
);

CREATE TABLE Industries (
  industryID  int NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(255),
  sectorID INT,
  sectorName VARCHAR(255),
  PRIMARY KEY (industryID),
  FOREIGN KEY (sectorID) REFERENCES Sectors(sectorID)
);

CREATE TABLE FiscalYear (
  fyID  int NOT NULL AUTO_INCREMENT,
  fiscalYear int(4), -- year is always 4 digits
  PRIMARY KEY (fyID)
);

CREATE TABLE DayStats (
  dayStatID int NOT NULL AUTO_INCREMENT,
  date DATETIME NOT NULL,
  dayOfWeek VARCHAR(10),
  volume int,
  open float,
  high float,
  low float,
  close float,
  adjclose  float,
  symbol VARCHAR(5),
  companyID INT,
  fiscalYear int(4),
  PRIMARY KEY (dayStatID),
  FOREIGN KEY (companyID) REFERENCES Companies(companyID)
  );
  
CREATE TABLE Leaders (
  leaderID  int NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  role VARCHAR(100),
  age INT,
  gender VARCHAR(10),
  startDate INT(4),
  endDate INT(4),
  founder BOOLEAN,
  company VARCHAR(255),
  PRIMARY KEY (leaderID)
);

CREATE TABLE IPOs (
  symbol VARCHAR(5),
  ipoDate DATETIME,
  lastSale float,
  CEOInChargeDuringIPO BOOLEAN,
  presidentInChargeDuringIPO BOOLEAN,
  revenue VARCHAR(256),
  netIncome VARCHAR(256),
  lastFiscalYearGrowth float,
  daysBetterThanSP INT,
  daysProfit INT,
  exactDifference INT,
  netIncomeYearBeforeIPO VARCHAR(256),
  fiscalYear int(4),
  sectorID INT,
  industryID INT,
  companyID INT,
  -- FOREIGN KEY (fiscalYear) REFERENCES FiscalYear(fiscalYear),
  FOREIGN KEY (sectorID) REFERENCES Sectors(sectorID),
  FOREIGN KEY (industryID) REFERENCES Industries(industryID),
  FOREIGN KEY (companyID) REFERENCES Companies(companyID)
);

CREATE TABLE AnnualReports (
  symbol VARCHAR(5),
  revenue float,
  revenueGrowth float,
  costOfRevenue float,
  grossProfit float,
  operatingExpenses float,
  operatingIncome float,
  earningsBeforeTax float,
  incomeTaxExpense float,
  totalAssets float,
  investments float,
  netIncome float,
  netDebt float,
  netCashFlow float,
  freeCashFlow float,
  dividendYield float,
  grossProfitMargin float,
  totalCurrentAsset float,
  netProfitMargin float,
  grossProfitGrowth float,
  operatingIncomeGrowth float,
  assetGrowth float,
  netIncomeGrowth float,
  marketCap float,
  payables float,
  totalDebt float,
  companyID INT,
  fiscalYear int(4),
  FOREIGN KEY (companyID) REFERENCES Companies(companyID)
  );


CREATE TABLE Companies (
  companyID  int NOT NULL AUTO_INCREMENT,
  symbol VARCHAR(5) UNIQUE, -- no stock tickers in the dataset have more than 5 chars
  industryID INT,
  summary VARCHAR(255),
  dateFounded DATETIME,
  numberOfEmployees int,
  fiscalDateEnd DATETIME,
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
  dayOfWeeks int(1),
  volume int,
  open float,
  high float,
  low float,
  close float,
  adjclose  float,
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
  startDate DATETIME,
  endDate DATETIME,
  founder BOOLEAN,
  company VARCHAR(255),
  PRIMARY KEY (leaderID)
);

CREATE TABLE IPOs (
  ipoDate DATETIME,
  lastSale float,
  CEOInChargeDuringIPO BOOLEAN,
  presidentInChargeDuringIPO BOOLEAN,
  revenue float,
  netIncome float,
  lastFiscalYearGrowth float,
  daysBetterThanSP INT,
  daysProfit INT,
  daysProfitGrouped INT,
  exactDifference INT,
  netIncomeYearBeforeIPO float,
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
  revenue float,
  revenueGrowth float,
  costOfRevenue float,
  grossProfit float,
  operatingExpenses float,
  operatingIncome float,
  earningsBeforeTax float,
  incomeTaxExpense float,
  netIncome float,
  dividendPerShare float,
  grossMargin float,
  profitMargin float,
  freeCashFlowMargin float,
  totalCurrentAssets float,
  taxAssets float,
  payables float,
  totalDebt float,
  companyID INT,
  fiscalYear int(4),
  FOREIGN KEY (companyID) REFERENCES Companies(companyID)
  );


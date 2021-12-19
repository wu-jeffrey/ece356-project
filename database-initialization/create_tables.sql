CREATE TABLE Companies (
  companyID BIGINT NOT NULL AUTO_INCREMENT,
  symbol VARCHAR(5) UNIQUE, -- no stock tickers in the dataset have more than 5 chars
  industryID BIGINT,
  summary VARCHAR(255),
  dateFounded DATETIME,
  numberOfEmployees int,
  fiscalDateEnd DATETIME,
  location

  PRIMARY KEY (companyID)
);

CREATE TABLE Sectors (
  sectorID BIGINT NOT NULL AUTO_INCREMENT,
  sectorName VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(255),

  PRIMARY KEY (secotrName)
);

CREATE TABLE Industries (
  industryID BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(255),

  PRIMARY KEY (industryID),
  FOREIGN KEY (sector) REFERENCES Sectors(sectorID)
);

CREATE TABLE FiscalYear (
  fiscalYear int(4) -- year is always 4 digits

  FOREIGN KEY (company) REFERENCES Companies(companyID),
  FOREIGN KEY (fiscalYear)
);

CREATE TABLE DayStats (
  date DATETIME,
  dayOfWeek VARCHAR((8),
  volume int,
  open decimal,
  high decimal,
  low decimal,
  close decimal,
  adjclose  DECIMAL,

  FOREIGN KEY (company) REFERENCES Companies(companyID),
  FOREIGN KEY (fiscalYear) REFERENCES FiscalYear(fiscalYear)
);

CREATE TABLE Leaders (
  leaderID BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR,
  role VARCHAR,
  age INT,
  gender VARCHAR,
  startDate DATETIME,
  endDate DATETIME,
  founder BOOLEAN,

  PRIMARY KEY (leaderID)
);

CREATE TABLE IPOs (
  ipoDate DATETIME,
  lastSale DECIMAL,
  CEOInChargeDuringIPO BOOLEAN,
  presidentInChargeDuringIPO BOOLEAN,
  revenue DECIMAL,
  netIncome DECIMAL,
  lastFiscalYearGrowth DECIMAL,
  daysBetterThanSP INT,
  daysProfit INT,
  daysProfitGrouped INT,
  exactDifference INT,
  netIncomeYearBeforeIPO DECIMAL,

  FOREIGN KEY (fiscalYear) REFERENCES FiscalYear(fiscalYear),
  FOREIGN KEY (sectorID) REFERENCES Sectors(sectorID),
  FOREIGN KEY (industryID) REFERENCES Industries(industryID),
  FOREIGN KEY (companyID) REFERENCES Companies(companyID)
);

CREATE TABLE AnnualReports (
  revenue DECIMAL,
  revenueGrowth DECIMAL,
  costOfRevenue DECIMAL,
  grossProfit DECIMAL,
  operatingExpenses DECIMAL,
  operatingIncome DECIMAL,
  earningsBeforeTax DECIMAL,
  incomeTaxExpense DECIMAL,
  netIncome DECIMAL,
  dividendPerShare DECIMAL,
  grossMargin DECIMAL,
  profitMargin DECIMAL,
  freeCashFlowMargin DECIMAL,
  totalCurrentAssets DECIMAL,
  taxAssets DECIMAL,
  payables DECIMAL,
  totalDebt DECIMAL,

  FOREIGN KEY (companyID) REFERENCES Companies(companyID),
  FOREIGN KEY (fiscalYear) REFERENCES FiscalYear(year)
);

CREATE TABLE Users (
  userID BIGINT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  password char(128) NOT NULL,
  admin BOOLEAN,

  PRIMARY KEY (userID)
);

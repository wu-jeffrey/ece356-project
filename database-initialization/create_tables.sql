CREATE TABLE Companies (
  companyID BIGINT NOT NULL AUTO_INCREMENT,
  symbol VARCHAR(5) UNIQUE, -- no stock tickers in the dataset have more than 5 chars
  industryID BIGINT,
  summary VARCHAR(255),
  dateFounded DATETIME,
  numberOfEmployees int,
  location

  PRIMARY KEY (companyID)
)

CREATE TABLE Sectors (
  sectorID BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(255),

  PRIMARY KEY (name)
)

CREATE TABLE Industries (
  industryID BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(255),

  PRIMARY KEY (industryID),
  FOREIGN KEY (sector) REFERENCES Sectors(gameID)
)

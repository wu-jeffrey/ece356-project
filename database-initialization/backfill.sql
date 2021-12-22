UPDATE Companies c 
INNER JOIN Sectors s ON c.sectorName = s.sectorName
SET c.sectorID = s.sectorID;

UPDATE Industries i 
INNER JOIN Sectors s ON i.sectorName = s.sectorName
SET i.sectorID = s.sectorID;

UPDATE Companies c
INNER JOIN Industries i ON i.name = c.industryName
SET c.industryID = i.industryID;

ALTER TABLE Leaders
ADD companyID INT;

UPDATE DayStats ds
INNER JOIN Companies c ON c.symbol = ds.symbol
SET ds.companyID = c.companyID;

ALTER TABLE Leaders ADD Constraint fk_company_id FOREIGN KEY (companyID) REFERENCES Companies(companyID);

ALTER TABLE Companies 
DROP COLUMN industryName;

ALTER TABLE Companies
DROP COLUMN sectorName;

ALTER TABLE Industries
DROP COLUMN sectorName;

UPDATE DayStats ds
INNER JOIN Companies c ON c.symbol = ds.symbol
SET ds.companyID = c.companyID;

ALTER TABLE DayStats
DROP COLUMN symbol;

UPDATE AnnualReports a
INNER JOIN Companies c ON c.symbol = a.symbol
SET a.companyID = c.companyID;

ALTER TABLE AnnualReports
DROP COLUMN symbol;
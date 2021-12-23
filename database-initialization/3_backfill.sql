ALTER TABLE Companies
ADD COLUMN ipoDate DATETIME;

UPDATE Companies c
INNER JOIN IPOs i ON i.companyID = c.companyID
SET c.ipoDate = i.ipoDate;

DROP TABLE IPOs;


ALTER TABLE Articles
ADD companyID INT;

ALTER TABLE Articles ADD CONSTRAINT fk_company_id FOREIGN KEY (companyID) REFERENCES Companies(companyID);

UPDATE Articles a
INNER JOIN Companies c ON c.symbol = a.symbol
SET a.companyID = c.companyID;


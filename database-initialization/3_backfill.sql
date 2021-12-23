UPDATE Companies c
INNER JOIN IPOs i ON i.companyID = c.companyID
SET c.ipoDate = i.ipoDate;

UPDATE Articles a
INNER JOIN Companies c ON c.symbol = a.symbol
SET a.companyID = c.companyID;

ALTER TABLE Articles
DROP symbol;
CREATE VIEW Homepage AS 
  select (select count(*) from Sectors) as sector_count,
    (select count(*) from Industries) as industry_count,
    (select count(*) from Articles) as article_count,
    (select count(*) from Companies) as company_count;

CREATE VIEW Individual AS
(
    SELECT c.*, ar.revenue, ar.dividendYield, ar.year, ar.marketCap, ar.grossProfit, s.sectorName, i.name as industryName
    FROM Companies c 
    INNER JOIN AnnualReports ar ON c.companyID = ar.companyID
    INNER JOIN Sectors s ON s.sectorID = c.sectorID
    INNER JOIN Industries i on i.industryID = c.industryID
);

 CREATE VIEW Institution AS(
     SELECT c.city, c.stateCountry, c.yearFounded, c.numberOfEmployees, c.companyName, ar.*, s.sectorName, i.name as industryName
    FROM Companies c 
    INNER JOIN AnnualReports ar ON ar.companyID = c.companyID
    INNER JOIN Sectors s ON s.sectorID = c.sectorID
    INNEr JOIN Industries i on i.industryID = c.industryID
);
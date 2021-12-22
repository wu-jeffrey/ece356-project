ALTER TABLE AnnualReports
DROP COLUMN fiscalYear;

ALTER TABLE AnnualReports
ADD year INT;

UPDATE AnnualReports
SET year = 2014;

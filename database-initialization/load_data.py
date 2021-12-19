import pymysql.cursors
import pandas as pd

data = pd.read_csv (r'/Users/ellenchoi/Desktop/short_datacsv/company.csv')   
df = pd.DataFrame(data)

print(df)
connection = pymysql.connect(user='j387wu', password='terriblepassworD123!',
                              host='marmoset04.shoshin.uwaterloo.ca',
                              database='db356_j387wu',
                              cursorclass=pymysql.cursors.DictCursor)
with connection:
    with connection.cursor() as cursor:
        # Create a new record
        sql = '''
        CREATE TABLE Companies (
  companyID BIGINT NOT NULL AUTO_INCREMENT,
  symbol VARCHAR(5) UNIQUE, -- no stock tickers in the dataset have more than 5 chars
  industryID BIGINT,
  summary VARCHAR(255),
  dateFounded DATETIME,
  numberOfEmployees int,
  fiscalDateEnd DATETIME,
  PRIMARY KEY (companyID)
)'''
        cursor.execute(sql)

    # connection is not autocommit by default. So you must commit to save
    # your changes.
    connection.commit()

    with connection.cursor() as cursor:
        # Read a single record
        sql = "SELECT `companyID` FROM `Companies`"
        cursor.execute(sql)
        result = cursor.fetchone()
        print(result)

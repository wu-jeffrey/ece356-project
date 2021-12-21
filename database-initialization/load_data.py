import pymysql.cursors
import pandas as pd
import pathlib
from datetime import datetime
import calendar

connection = pymysql.connect(user='j387wu', password='terriblepassworD123!',
                              host='marmoset04.shoshin.uwaterloo.ca',
                              database='db356_j387wu',
                              cursorclass=pymysql.cursors.DictCursor)

def executeScriptsFromFile(cursor, filename):
    # Open and read the file as a single buffer
    fd = open(filename, 'r')
    sqlFile = fd.read()
    fd.close()

    # all SQL commands (split on ';')
    sqlCommands = sqlFile.split(';')

    # Execute every command from the input file
    for command in sqlCommands:
        # This will skip and report errors
        # For example, if the tables do not yet exist, this will skip over
        # the DROP TABLE commands
        try:
            cursor.execute(command)
        except Exception as e:
            print("Command skipped: ", e)

def convert_csv_to_df(filename):
    data = pd.read_csv (filename)   
    df = pd.DataFrame(data)
    df = df.dropna() # drop NaN rows
    return df


with connection:
    with connection.cursor() as cursor:
        # DELETE ALL TABLES
        cursor.execute("DROP TABLE IF EXISTS `AnnualReports`, `Companies`, `DayStats`, `FiscalYear`, `IPOs`, `Industries`, `Leaders`, `Sectors`")
        connection.commit()
        # Create Tables
        fn = pathlib.Path(__file__).parent / 'create_tables.sql'
        executeScriptsFromFile(cursor, fn)
        connection.commit()

    with connection.cursor() as cursor:
        # Input Company Data
        file_name = pathlib.Path(__file__).parent / 'short_datacsv/company.csv'
        df = convert_csv_to_df(file_name)
        for row in df.itertuples():
            sql = "INSERT INTO `Companies` (`symbol`, `companyName`, `yearFounded`, `numberOfEmployees`) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (row.Symbol, row.Name, int(row.YearFounded), int(row.employees)))
            connection.commit()
            result = cursor.fetchone()
        print("INSERTED INTO COMPANIES: ", len(df))
        
        # Input Leader Data
        file_name = pathlib.Path(__file__).parent / 'short_datacsv/leader.csv'
        df = convert_csv_to_df(file_name)
        for row in df.itertuples():
            sql = "INSERT INTO `Leaders` (`name`, `age`, `gender`, `startDate` ) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (row.CEOName, row.CEOAge, row.CEOGender, row.CEOTakeOver))
            connection.commit()
            result = cursor.fetchone()
        print("INSERTED INTO LEADERS: ", len(df))
        
        
        # Insert DayStats

        file_name = pathlib.Path(__file__).parent / 'short_datacsv/dayStat.csv'
        df = convert_csv_to_df(file_name)
        yy_mm_dd = '%Y/%m/%d'

        for row in df.itertuples():
            sql = "INSERT INTO `DayStats` (`date`, `dayOfWeek`, `volume`, `open`, `high`, `low`, `close`, `adjclose`, `symbol`, `fiscalYear`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            date = datetime.strptime(row.date, yy_mm_dd)
            cursor.execute(sql, (date.date(), calendar.day_name[date.weekday()], row.volume, row.open, row.high, row.low, row.close, row.adjclose, row.symbol, date.year))
            connection.commit()
        print("INSERTED INTO DayStats: ", len(df))
        
        # Insert IPOs
        file_name = pathlib.Path(__file__).parent / 'short_datacsv/IPODataFull.csv'
        df = convert_csv_to_df(file_name)
        for row in df.itertuples():
            sql = "INSERT INTO `IPOs` (`symbol`, `ipodate`, `lastSale`, `CEOInChargeDuringIPO`, `presidentInChargeDuringIPO`, `revenue`, `netIncome`, `lastFiscalYearGrowth`, `daysBetterthanSP`, `daysProfit`, `netIncomeYearBeforeIPO`, `fiscalYear`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            ipoDate = datetime(row.Year, row.Month, row.Day).date()
            cursor.execute(sql, (row.Symbol, ipoDate, row.LastSale, True if row.CEOInChargeDuringIPO == 'Yes' else False, True if row.presidentInChargeDuringIPO == 'Yes' else False, row.Revenue, row.netIncome, row.lastFiscalYearGrowth, row.DaysBetterThanSP, row.daysProfit, row.netIncome, ipoDate.year))
            connection.commit()
        print("INSERTED INTO IPOs: ", len(df))
        
        # # Insert Annual Reports
        file_name = pathlib.Path(__file__).parent / 'short_datacsv/2014AnnualReport.csv'
        df = convert_csv_to_df(file_name)
        for row in df.itertuples():
            sql = """
            INSERT INTO `AnnualReports` (`symbol`, `revenue`, `revenueGrowth`, `costOfRevenue`, `grossProfit`, `operatingExpenses`, `operatingIncome`, `earningsBeforeTax`, 
            `incomeTaxExpense`, `netIncome`, `totalAssets`, `investments`, `netDebt`, `netCashFlow`, `freeCashFlow`, `dividendYield`, `grossProfitMargin`,
            `totalCurrentAsset`,`payables`, `totalDebt`,
            `netProfitMargin`, `marketCap`, `grossProfitGrowth`, `operatingIncomeGrowth`, `netIncomeGrowth`, `assetGrowth`) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
            
            cursor.execute(sql, (row.Symbol, row.Revenue, row.RevenueGrowth, row.CostOfRevenue, row.GrossProfit, row.OperatingExpenses, row.OperatingIncome, row.EarningsBeforeTax, row.IncomeTaxExpense, row.NetIncome,
            row.TotalAssets, row.Investments, row.NetDebt, row.NetCashFlow, row.FreeCashFlow, row.dividendYield, row.grossProfitMargin, 
            row.TotalCurrentAsset, row.Payables, row.TotalDebt, row.netProfitMargin, row.marketCap, row.grossProfitGrowth, row.operatingIncomeGrowth, row.netIncomeGrowth, row.AssetGrowth))
            connection.commit()
        print("INSERTED INTO AnnualReport: ", len(df))
import pymysql.cursors
import numpy as np
import pandas as pd
import pathlib
from datetime import datetime
import calendar

connection = pymysql.connect(
    user="j387wu",
    password="terriblepassworD123!",
    host="marmoset04.shoshin.uwaterloo.ca",
    database="db356_j387wu",
    cursorclass=pymysql.cursors.DictCursor,
)


def executeScriptsFromFile(cursor, filename):
    # Open and read the file as a single buffer
    fd = open(filename, "r")
    sqlFile = fd.read()
    fd.close()

    # all SQL commands (split on ';')
    sqlCommands = sqlFile.split(";")

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
    data = pd.read_csv(filename, nrows=15000)
    df = pd.DataFrame(data)
    df = df.where(pd.notnull(df), None)
    df = df.replace(np.nan, 0)
    return df


with connection:
    with connection.cursor() as cursor:
        year = 2015
        files = [
            pathlib.Path(__file__).parent / "data_csv/2015AnnualReport.csv",
            pathlib.Path(__file__).parent / "data_csv/2016AnnualReport.csv",
            pathlib.Path(__file__).parent / "data_csv/2017AnnualReport.csv",
            pathlib.Path(__file__).parent / "data_csv/2018AnnualReport.csv"
        ]
        for file_name in files:
            df = convert_csv_to_df(file_name)
            i = 1
            for row in df.itertuples():
                print("annual report year {} row {}".format(year, i))
                sql = """
                INSERT INTO `AnnualReports` (`symbol`, `revenue`, `revenueGrowth`, `costOfRevenue`, `grossProfit`, `operatingExpenses`, `operatingIncome`, `earningsBeforeTax`, 
                `incomeTaxExpense`, `netIncome`, `totalAssets`, `investments`, `netDebt`, `netCashFlow`, `freeCashFlow`, `dividendYield`, `grossProfitMargin`,
                `totalCurrentAsset`,`payables`, `totalDebt`,
                `netProfitMargin`, `marketCap`, `grossProfitGrowth`, `operatingIncomeGrowth`, `netIncomeGrowth`, `assetGrowth`, `year`) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

                cursor.execute(
                    sql,
                    (
                        row.Symbol,
                        row.Revenue,
                        row.RevenueGrowth,
                        row.CostofRevenue,
                        row.GrossProfit,
                        row.OperatingExpenses,
                        row.OperatingIncome,
                        row.EarningsbeforeTax,
                        row.IncomeTaxExpense,
                        row.NetIncome,
                        row.Totalassets,
                        row.Investments,
                        row.NetDebt,
                        row.Netcashflow,
                        row.FreeCashFlow,
                        row.dividendYield,
                        row.grossProfitMargin,
                        row.Totalcurrentassets,
                        row.Payables,
                        row.Totaldebt,
                        row.netProfitMargin,
                        row.MarketCap,
                        row.GrossProfitGrowth,
                        row.OperatingIncomeGrowth,
                        row.NetIncomeGrowth,
                        row.AssetGrowth,
                        str(year)
                    ),
                )
                i += 1
            connection.commit()
            print("INSERTED INTO {} AnnualReport: ".format(year), len(df), "\n")
            year += 1

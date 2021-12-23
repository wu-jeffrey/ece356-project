# Load DayStat

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
    data = pd.read_csv(filename)
    df = pd.DataFrame(data)
    df = df.where(pd.notnull(df), None)
    df = df.replace(np.nan, 0)
    return df


with connection:
    with connection.cursor() as cursor:

        distinct_symbols_sql = "SELECT DISTINCT `Symbol` from `Companies`"
        cursor.execute(distinct_symbols_sql)
        result = cursor.fetchall()
        symbols = set([x["Symbol"] for x in result])

        # # Insert DayStats

        file_name = pathlib.Path(__file__).parent / "data_csv/dayStat2.csv"
        df = convert_csv_to_df(file_name)
        yy_mm_dd = "%Y-%m-%d"
        i = 0
        for row in df.itertuples():
            i += 1
            if row.symbol in symbols and i % 100 == 0:
                print("row: ", i)
                sql = "INSERT INTO `DayStats` (`date`, `dayOfWeek`, `volume`, `open`, `high`, `low`, `close`, `adjclose`, `symbol`, `fiscalYear`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                date = datetime.strptime(row.date, yy_mm_dd)
                cursor.execute(
                    sql,
                    (
                        date.date(),
                        calendar.day_name[date.weekday()],
                        row.volume,
                        row.open,
                        row.high,
                        row.low,
                        row.close,
                        row.adjclose,
                        row.symbol,
                        date.date().year,
                    ),
                )

        connection.commit()
        print("INSERTED INTO DayStats: ", len(df), "\n")

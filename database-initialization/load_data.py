import pymysql.cursors
import pandas as pd
import pathlib
import datetime as dt

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
            print(result)
        
        # Input Leader Data
        file_name = pathlib.Path(__file__).parent / 'short_datacsv/leader.csv'
        df = convert_csv_to_df(file_name)
        for row in df.itertuples():
            sql = "INSERT INTO `Leaders` (`name`, `age`, `gender`, `startDate`VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (row.CEOName, row.CEOAge, row.CEOGender, row.CEOTakeOver))
            connection.commit()
            result = cursor.fetchone()
            print(result)

        df = convert_csv_to_df()
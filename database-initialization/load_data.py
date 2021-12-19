import pymysql.cursors 
import pandas as pd

data = pd.read_csv (r'/Users/ellenchoi/Desktop/short_datacsv/company.csv')   
df = pd.DataFrame(data)

print(df)
db=pymysql.connect(user='j387wu', passwd='terriblepassworD123!',
                              host='marmoset04.shoshin.uwaterloo.ca',
                              db='db356_j387wu')


cursor = db.cursor()
cursor.execute("SELECT VERSION()")
db.close()


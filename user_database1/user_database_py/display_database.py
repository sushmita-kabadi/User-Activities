#!/usr/bin/python
import MySQLdb
import cgi
import ast
import sys
import json
print "Content-type: text/html\n"
#form=cgi.FieldStorage()


def display_db() :
    tmp=[]
    db = MySQLdb.connect(host="172.16.20.136",
                    user="root",
                    passwd="tas123",
                    db="user"
                    )
    cursor = db.cursor()
    sql = "select * from user"
    number_of_rows = cursor.execute(sql)
    while True:
        row = cursor.fetchone()
        if row == None:
             break
        tmp.append(row)
    #db.commit()
    cursor.close()
    db.close()
   # return tmp
    return json.dumps({'Content':tmp});

 
  
if __name__ == '__main__' :
   #tmp = display_db()
   #display_db()
#   sys.exit()
  # print "hi"
   form = cgi.FieldStorage()
   if  (form.has_key("input_str")) :
      input_str = form["input_str"].value
      jsonObj  = ast.literal_eval(input_str)
      tmp = display_db() 
      print tmp

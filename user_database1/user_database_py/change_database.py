#!/usr/bin/python
import json
import MySQLdb
import cgi
import ast
print "Content-type: text/html\n"
form=cgi.FieldStorage()

def update_db(user_id, user_passwd, user_name, user_role, login_status) :
 db = MySQLdb.connect(host="172.16.20.136", user="root", passwd="tas123", db="user")

 cursor = db.cursor()

 #sql =  "update user set  user_name='user_name' , login_status='login_status' where user_id='1' and user_passwd='1' and user_role='1'" 
 sql =  "update user set  user_passwd = '%s',user_role='%s'  where user_name = '%s' and user_id = '%s'"%(user_passwd, user_role , user_name, user_id) 
 cursor.execute(sql)
 db.commit()
 cursor.close()
 db.close()
 return 1

def display_db():
 tmp=[]
 db1=MySQLdb.connect(host="172.16.20.136" , user="root" , passwd="tas123" , db="user")
 sql = "select * from user"
 number_of_rows = cur.execute(sql)
 while True:
    row = cur.fetchone()
    if row == None:
        break
        tmp.append(row)
    #db.commit()
   # return tmp
 cur.close()
 db1.close()
 return json.dumps({'Content':tmp});
 return 1

if __name__ == '__main__' :
   #insert_into_db()
   #sys.exit()
   #print "hi"
   form = cgi.FieldStorage()
   #:print "hi"
   if  (form.has_key("input_str")) :
      input_str = form["input_str"].value
      jsonObj  = ast.literal_eval(input_str)
      user_id = jsonObj.get('id', '')
      user_passwd = jsonObj.get('passwd', '')
      user_name = jsonObj.get('name','' )
      user_role = jsonObj.get('role', '')
      login_status = jsonObj.get('statuss','')
      tmp1 = update_db(user_id, user_passwd, user_name, user_role, login_status)
      #tmp = display_db()
      print tmp1

#!/usr/bin/python

import MySQLdb
import cgi
import ast
print "Content-type: text/html\n"
form=cgi.FieldStorage()

def insert_into_db(user_id, user_passwd, user_name, user_role, login_status) :

 db = MySQLdb.connect(host="172.16.20.136", user="root", passwd="tas123", db="user")

 cursor = db.cursor()
 #sql =  "INSERT INTO user VALUES ('user_id','user_passwd','user_name','user_role','login_status')"
 sql =  "INSERT INTO user(user_id,user_passwd,user_name,user_role,login_status) values (%s, '%s', '%s', '%s', '%s')"%(user_id, user_passwd, user_name, user_role, login_status)

 cursor.execute(sql)

 db.commit()
 cursor.close()
 db.close()
 return 1

if __name__ == '__main__' :
   #insert_into_db()
   #sys.exit()
   form = cgi.FieldStorage()
   if  (form.has_key("input_str")) :
      input_str = form["input_str"].value
      jsonObj  = ast.literal_eval(input_str)
      user_id = jsonObj.get('id', '')
      user_passwd = jsonObj.get('passwd', '')
      user_name = jsonObj.get('name','' )
      user_role = jsonObj.get('role', '')
      login_status = jsonObj.get('statuss','')
      tmp = insert_into_db(user_id, user_passwd, user_name, user_role, login_status)
      print tmp

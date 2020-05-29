#!/usr/bin/python
# -*- coding: utf-8 -*-
import MySQLdb
import inotify.adapters
import time
import argparse
import cgi
import ast
import os,fnmatch
import sys
import json
import glob
import subprocess as sp
import commands
import shutil
from PyPDF2 import PdfFileWriter, PdfFileReader ,PdfFileMerger

def display():
    while 1:   
        con = MySQLdb.connect(host="172.16.20.136" , passwd="tas123" , user="root" , db="TOC_SLT_Production")
        db = con.cursor()

        sql5 = "select doc_id from OCR_Pagewise where sent_status='%s' and recv_status='%s'"%('N','N')
        db.execute(sql5) 
        res5 = db.fetchone()
        sql5=(3833830,)
        if (res5==None):
            db.close()
            con.close()
            time.sleep(10)
        else:
            r1 = str(res5)
            r2 = r1.replace(',','')
            r3 = r2.replace(')','')
            doc_id1 = r3.replace('(','')
            doc_id = ast.literal_eval(doc_id1)

            tmp=[]
            path = "/var/www/html/INFOSIEVE_PROJECTS/LOCALGD/data/input/"
            out_path1="/var/www/html/sushmita/ocr_docs_25347/tmp_output/"
            out_path="/var/www/html/ocr_docs_25347/input/"
            org_doc_path = "/var/www/html/ocr_docs_25347/Original_Document"
            cop_org_doc = "cp "+"/var/www/html/INFOSIEVE_PROJECTS/LOCALGD/data/input/"+str(doc_id)+'.pdf'+" "+org_doc_path
            os.system(cop_org_doc)
            print'cop_org_doc', cop_org_doc
            filname =str(doc_id)+".pdf"
            fil_out = str(doc_id)+".pdf"
            fname =out_path+ fil_out
            list_pdf = os.listdir("/var/www/html/INFOSIEVE_PROJECTS/LOCALGD/data/input")
            path1 = path + filname
            pdf_reader = PdfFileReader(path1)
            no_of_pages = pdf_reader.getNumPages()
            j=0
    
            for i in range(0,no_of_pages):
                j=j+1
                doc_page_no = str(doc_id)+"_"+str(j)
                tmp.append(doc_page_no)
                pdf_page = out_path1 + str(doc_page_no)+".pdf"
                pdf_writer = PdfFileWriter()
                pdf_writer.addPage(pdf_reader.getPage(i))
                print i
        
                with open(pdf_page , 'wb') as out:
                    pdf_writer.write(out)
                print pdf_page
                cmd1 = "cp "+pdf_page+" "+out_path
                print cmd1
                os.system(cmd1)
            con = MySQLdb.connect(host="localhost" , user="root" , passwd="tas123" , db="TOC_SLT_Production")
            db=con.cursor()
            sql1 = "update OCR_Pagewise set sent_status='%s' where doc_id='%s'"%('Y',doc_id)
            print sql1
            db.execute(sql1)
            con.commit()
            time.sleep(900)
    
            list_pdf = os.listdir("/var/www/html/ocr_docs_25347/output")
    
            all_pdf = fnmatch.filter(os.listdir("/var/www/html/sushmita/ocr_docs_25347/tmp_output"), str(doc_id)+'*.pdf')
            for j in range(0,len(all_pdf)):
                print all_pdf[j]
                if all_pdf[j] not in list_pdf:
                    print"missed::::::::::::::::",all_pdf[j]
                    cmd = "cp "+"/var/www/html/sushmita/ocr_docs_25347/tmp_output/"+all_pdf[j]+" " "/var/www/html/ocr_docs_25347/output/"
                    cmd_missed = "cp "+"/var/www/html/sushmita/ocr_docs_25347/tmp_output/"+all_pdf[j]+" " "/var/www/html/ocr_docs_25347/missed_output_docs/"
                    os.system(cmd)
                    os.system(cmd_missed)
                doc_dir = all_pdf[j].split('_')
                only_doc = doc_dir[0]
                print only_doc
                file_path = "/var/www/html/ocr_docs_25347/ocr_done_docs/"+only_doc
                if not os.path.exists(file_path):
                    os.mkdir(file_path)
                cmd1 = "cp "+"/var/www/html/ocr_docs_25347/output/"+all_pdf[j]+" " "/var/www/html/ocr_docs_25347/ocr_done_docs/"+only_doc
                print cmd1
                os.system(cmd1)
                print cmd1
            pdfs = "/var/www/html/ocr_docs_25347/ocr_done_docs/"+only_doc
            print pdfs
            pdf_merge_path = "/var/www/html/ocr_docs_25347/ocr_done_docs/"+only_doc+"/"+only_doc+".pdf"
            print pdf_merge_path
            pdfsss = os.listdir(pdfs)
            tmp1=[]
            for l in pdfsss:
              if('_' in l):
                sor = l.split('_')
                sor_sor = sor[1].split('.')
                sor_doc = sor_sor[0]
                tmp1.append(int(sor_doc))
            tmp1.sort()
            pdfss=[]
            for k in tmp1:
                bck_pdf = only_doc+"_"+str(k)+".pdf"
                pdfss.append(bck_pdf)

            merger = PdfFileMerger()
            for pdf in pdfss:
                print pdf
                merge_path = "/var/www/html/ocr_docs_25347/ocr_done_docs/"+only_doc+"/"+pdf
                merger.append(PdfFileReader(merge_path), 'rb')


            with open(pdf_merge_path, 'wb') as fout:
                merger.write(fout)

            sql2 = "update OCR_Pagewise set recv_status='%s' where doc_id='%s'"%('Y',doc_id)
            print sql2
            db.execute(sql2)
            con.commit()
            output_folder = os.listdir("/var/www/html/ocr_docs_25347/output/")
            for output_doc in output_folder:
                rm_cmd = "rm -rf "+"/var/www/html/ocr_docs_25347/output/"+output_doc
                #print rm_cmd
                os.system(rm_cmd)
            doc_done_path = '/var/www/html/ocr_docs_25347/ocr_done_docs/'+only_doc+'/'+only_doc+'.pdf'
            input_doc_copy_path = '/var/www/html/INFOSIEVE_PROJECTS/LOCALGD/input'
            cop_input = "cp "+ doc_done_path+" "+input_doc_copy_path
            print 'cop_input' , cop_input
            os.system(cop_input)
            


            time.sleep(10)


if __name__=="__main__":
    display()
    sys.exit()
    #form = cgi.FieldStorage()
    #input_str = form["input_str"].value
    #if(form.has_key("input_str")):
    #    jsonObj = ast.literal_eval(input_str)
    #    doc_id = jsonObj.get('doc_id','')
    #    tmp = display(doc_id)

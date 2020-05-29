//var CGI_IP    =   'http://192.168.1.220';
var CGI_IP    =   'http://172.16.20.136';
var CGI_DIR   =   '/cgi-bin/sushmita/user_database/';


id=''
passwd=''
name=''
role=''
statuss=''
flag=1;

function send_ajax_request(cgi_file, post_data, succ_flag, callback, request_type, asyn){
        var xmlhttp = (window.XMLHttpRequest)?(new XMLHttpRequest({mozSystem: true})):(new ActiveXObject("Microsoft.XMLHTTP"));
        xmlhttp.onreadystatechange=function(){
                if(xmlhttp.readyState ==4 && xmlhttp.status==200 && succ_flag == 1) {
                        var text        = xmlhttp.responseText;
                        var xml         = xmlhttp.responseXML;
                       try {var json    = JSON && JSON.parse(text) || eval(text); }
                       catch(e){ console.log("Error JSON.parse "+e) }
                       try
                            {
                                            var callfunc    = eval(callback);
                            }
                       catch(e)
                            {
                                 alert("Error while eval callback "+e.lineNumber+"==="+e)
                            }
          }
        }
        xmlhttp.open(request_type,cgi_file,asyn);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(post_data);
    }		
function init() 
{		
}		
function insert(){
	id=document.getElementById("tt1").value;
         passwd=document.getElementById("tt2").value;
                name=document.getElementById("tt3").value;
                role=document.getElementById("tt4").value;
                statuss=document.getElementById("tt5").value;
    var vservice_path       = CGI_IP + CGI_DIR + 'insert_form.py?input_str=';
    var vret_str            = {'buttons': 'Display', "id":id , "passwd":passwd , "name":name , "role":role , "statuss":statuss};
    var strURL              = vservice_path  + JSON.stringify(vret_str);
    send_ajax_request(strURL, null, 1, "DisplayRecord(json)","POST", false)




		
}		

function DisplayRecord1(){


}



function insert1()
{

	 document.getElementById("new_table1").style.display = 'block';
         var popup = document.getElementById("modal1");
  $(popup).show();







}
		
		
function DisplayRecord()
{		
	  var vservice_path = CGI_IP + CGI_DIR + 'insert_python_script_backup_7.py?input_str=';
    var vret_str = {};
    var strURL = vservice_path  + JSON.stringify(vret_str);
    send_ajax_request(strURL, null, 1, "DisplayInfo(json)","POST", false)
		
}		
		
		
function DisplayInfo(result)
{
       

      var text=JSON.stringify(result['Content'])
   var javascriptObject = JSON.parse(text)

tmp = javascriptObject
text = '<thread>'
for(i=0;i< tmp.length;i++)
                {
                       
                        ids  = String(tmp[i][0]);
                        text= text+"<tr id ="+String(ids)+"><td align='center'>"+tmp[i][0]+"</td><td align='center'>"+tmp[i][1]+"</td><td align='center'>"+tmp[i][2]+"</td><td align='center'>"+tmp[i][3]+"</td><td align='center'>"+tmp[i][4]+"</td><td align='center'><button type=button' class='pop' id='pop' value='change' onclick='popup("+ids+")'/>change</td></tr>";

                       
                }
text = text + '</thread>'

                document.getElementById("tb").innerHTML=text;
		
}		

function popWindow()
{
	window.open("http://172.16.20.136/insert_form.html","mywindow","menubar=1,resizable=1,width=400,height=300");
	window.onload=DisplayRecord();
	window.close();
	

}
function popup(obj)
{
        res = document.getElementById(obj)
       res1 = res.getElementsByTagName('td')
        UserId = res1[0].innerText;
  UserPassword = res1[1].innerText;
  UserName = res1[2].innerText;
  UserRole = res1[3].innerText;
  LoginStatus = res1[4].innerText;
        document.getElementById("new_table").style.display = 'block'
         var popup = document.getElementById("modal");
  $(popup).show();
	document.getElementById('t1').value=UserId;
	document.getElementById('t2').value=UserPassword;
	document.getElementById('t3').value=UserName;
	document.getElementById('t4').value=UserRole;
	document.getElementById('t5').value=LoginStatus;
  
}
function close1()
{
	
	document.getElementById('modal').style.display='none';
	document.getElementById('new_table').style.display='none';
}

function close2()
{

        document.getElementById('modal1').style.display='none';
        document.getElementById('new_table1').style.display='none';

}





function EditContent()
{
	UI=document.getElementById('t1').value;
	UP=document.getElementById('t2').value;
	UN=document.getElementById('t3').value;
	UR=document.getElementById('t4').value;
	LS=document.getElementById('t5').value;

	 var vservice_path       = CGI_IP + CGI_DIR + 'change.py?input_str=';
    var vret_str            = {'buttons': 'Display', "id":UI , "passwd":UP , "name":UN , "role":UR , "statuss":LS};
    var strURL              = vservice_path  + JSON.stringify(vret_str);
    send_ajax_request(strURL, null, 1, "DisplayRecord(json)","POST", false)

	
}


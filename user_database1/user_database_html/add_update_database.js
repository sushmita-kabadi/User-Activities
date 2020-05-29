var CGI_IP    =   'http://172.16.20.136';
var CGI_DIR   =   '/cgi-bin/sushmita/user_database/';


id=''
passwd=''
name=''
role=''
statuss=''
flag=1;
//var slno=0;

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
    alert('hi') 
}		
function insert(){
	alert("inserting data")

	id=document.getElementById("tt1").value;
    alert('id:::::::::::'+id)
         passwd=document.getElementById("tt2").value;
        alert('passwd:::::::'+passwd)
                name=document.getElementById("tt3").value;
        alert('name:::::::'+name)
                role=document.getElementById("tt4").value;
        alert('role::::::::'+role)
                statuss=document.getElementById("tt5").value;
        alert('statuss:::::'+statuss)
    var vservice_path       = CGI_IP + CGI_DIR + 'insert_database.py?input_str=';
    var vret_str            = {'buttons': 'Display', "id":id , "passwd":passwd , "name":name , "role":role , "statuss":statuss};
    var strURL              = vservice_path  + JSON.stringify(vret_str);
    console.log('CGI Restore MetaData ===>>>>'+strURL);
    send_ajax_request(strURL, null, 1, "DisplayRecord(json)","POST", false)




		
}		

function DisplayRecord1(){
  //document.getElementById("new_table1").style.display = 'none'
    //      document.getElementById("modal1").style.display = 'none'


}



function insert1()
{

	alert("hi")
	 document.getElementById("new_table1").style.display = 'block';
         var popup = document.getElementById("modal1");
  $(popup).show();
//	id=document.getElementById("t1").value;
//	alert(id)







}
		
		
function DisplayRecord()
{		
	alert("hi")
          document.getElementById("new_table").style.display = 'none'
	document.getElementById("modal").style.display = 'none'
	  var vservice_path = CGI_IP + CGI_DIR + 'display_database.py?input_str=';
    var vret_str = {};
    var strURL = vservice_path  + JSON.stringify(vret_str);
    console.log('CGI Restore MetaData ===>>>>'+strURL);
  //  alert('str url'+strURL)
    send_ajax_request(strURL, null, 1, "DisplayInfo(json)","POST", false)
		
//strURL, null, 1,"displayRecord(json)", "POST", false
}		
		
		
function DisplayInfo(result)
{
         // alert('hh')
	//alert(result)
      var text=JSON.stringify(result['Content'])
   var javascriptObject = JSON.parse(text)
//alert(javascriptObject)
tmp = javascriptObject
text = '<thread>'
for(i=0;i< tmp.length;i++)
                {
                       //alert('tttttt')
                        ids  = String(tmp[i][0]);
                        text= text+"<tr id ="+String(ids)+"><td align='center'>"+tmp[i][0]+"</td><td align='center'>"+tmp[i][1]+"</td><td align='center'>"+tmp[i][2]+"</td><td align='center'>"+tmp[i][3]+"</td><td align='center'>"+tmp[i][4]+"</td><td align='center'><button type=button' class='pop' id='pop' value='change' onclick='popup("+ids+")'/>change</td></tr>";

                        //alert('ttt'+text)
                }
text = text + '</thread>'
alert('texty==='+text)
                document.getElementById("tb").innerHTML=text;
		
}		

function popWindow()
{
	//alert("hi")
	window.open("http://192.168.1.220/insert_form.html","mywindow","menubar=1,resizable=1,width=400,height=300");
	window.onload=DisplayRecord();
	window.close();
//	document.getElementById('popup').style.display = "http://192.168.1.220/insert_backup_2.html";
	

}
function popup(obj)
{
	//document.getElementById('popup').style.display='block';
	//alert("hi")
         //alert('obj::::::::::'+obj)
        res = document.getElementById(obj)
        //alert('res:::::::::::'+res)
       res1 = res.getElementsByTagName('td')
        //alert('tdddddddd'+res1)
        UserId = res1[0].innerText;
	//alert("ddddd"+UserId)
  UserPassword = res1[1].innerText;
	//alert("dddddd"+UserPassword)
  UserName = res1[2].innerText;
	//alert("ddddd"+UserName)
  UserRole = res1[3].innerText;
	//alert("ddddd"+UserRole)
  LoginStatus = res1[4].innerText;
        document.getElementById("new_table").style.display = 'block'
         var popup = document.getElementById("modal");
  $(popup).show();
  	//alert("ddddd"+LoginStatus)
        //alert('hhhhhhhhhhh'+document.getElementById('t1').value)
	document.getElementById('t1').value=UserId;
	document.getElementById('t2').value=UserPassword;
	document.getElementById('t3').value=UserName;
	document.getElementById('t4').value=UserRole;
	document.getElementById('t5').value=LoginStatus;
  
}
function close1()
{
	
	//alert("hi")
	// $(new_table).hide();
	
	//$(modal).hide();
	alert("popup gets closed")
	document.getElementById('modal').style.display='none';
	document.getElementById('new_table').style.display='none';
}

function close2()
{

	alert("popup gets closed")
        document.getElementById('modal1').style.display='none';
        document.getElementById('new_table1').style.display='none';

}





function EditContent()
{
	alert("Changing contents")
	UI=document.getElementById('t1').value;
//	alert('rrrrrrr'+UI)
	UP=document.getElementById('t2').value;
//	alert('rrrrrrrrrrr'+UP)
	UN=document.getElementById('t3').value;
//	alert('rrrrrrrr'+UN)
	UR=document.getElementById('t4').value;
//	alert('rrrrrrrrr'+UN)
	LS=document.getElementById('t5').value;
//	alert('rrrrrrrr'+LS)

	 var vservice_path       = CGI_IP + CGI_DIR + 'change_database.py?input_str=';
    var vret_str            = {'buttons': 'Display', "id":UI , "passwd":UP , "name":UN , "role":UR , "statuss":LS};
    var strURL              = vservice_path  + JSON.stringify(vret_str);
    alert("strURL........."+strURL)
    console.log('CGI Restore MetaData ===>>>>'+strURL);
    send_ajax_request(strURL, null, 1, "DisplayRecord(json)","POST", false)

	
}


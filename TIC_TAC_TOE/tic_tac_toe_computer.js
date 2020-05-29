var X_O = 0
com_mrk = 0
mark = 0
mrk = 0
X_vals = []
O_vals = []
vals = []
tot_val = 0
win_flag = 0
exist_O=[]
exist_X=[]
X_values = []
//exist_o = []
//exist_x = []
function restart()
{
	win_flag = 0
	mark = 0
	document.getElementById('num_row_col').innerHTML = '';
	document.getElementById('tb').innerHTML = '';
	document.getElementById('cont').innerHTML = '';
	get_row_col()
	
}
function get_row_col()
{
	var sel = document.getElementById("num_row_col");
	var blank = document.createElement("option");
        blank.textContent = " ";
        blank.value =" ";
        sel.appendChild(blank)

        for(i=3;i<=25;i++)
         {
	        num = parseInt(i)
		if(num>=3 && num%2!=0)
		{
			var opt = i+'x'+i;
	                var el = document.createElement("option");
        	        el.textContent = opt;
	                el.value = opt;
        	        sel.appendChild(el)

		}

         }
}

function load()
{
	document.getElementById('cont').innerHTML = 'Your turn';
	X_values = []
	win_flag = 0
	alert(win_flag)
	X_vals = []
	O_vals = []
	
	X_O = 0
	var val = document.getElementById("num_row_col").value;
	text = " "
	if(val != " ")
	{
		alert("VAL"+val)
		val = val.split('x')
		val = parseInt(val);
		tot_val = val*val;
		count = 0
		for(i=1;i<=val;i++)
		{
			for(j=1;j<=val;j++)
			{
				count = count + 1
				text = text + "<td onclick='dump("+count+")' id ="+count+"></td>"
			} 	
			text = "<tr>"+text+"</tr>"
		}
		document.getElementById('tb').innerHTML = text;
	}
	tot_val = val*val
	//alert(tot_val)
	var values=[]
	vals = []
	num = 0
	cnt = 0
	for(i=1;i<=val;i++)
	{
		for(j=1;j<=val;j++)
		{
			num = num + 1
			values.push(num)
		}	
		vals.push(values)
		values=[]
		
	}
	num = 0
	for(i=1;i<=val;i++)
        {
		cnt = cnt + 1	
                for(j=1;j<=val;j++)
                {
			num = num + 1
                        if(cnt == j)
			{
                        	values.push(num)
			}
                }

        }
        vals.push(values)
	values=[]
	num = 0
	tt = val
        for(i=1;i<=val;i++)
        {
                for(j=val;j>=i;j--)
                {
                        if(i == j)
                        {
				num = i + j + 1
                                values.push(num)
                        }
                }

        }
        vals.push(values)
	values=[]
	num = 0
	cnt = 0
        for(i=1;i<=val;i++)
        {
		cnt = cnt + 1
                for(j=1;j<=val;j++)
                {
			num = num + 1
			if(j == 1)
                        {
                                values.push(num)
                        }
                }

        }
        vals.push(values)
        values=[]
	num = 0
        cnt = 0
        for(i=1;i<=val;i++)
        {
                cnt = cnt + 1
                for(j=1;j<=val;j++)
                {
                        num = num + 1
                        if(j == 2)
                        {
                                values.push(num)
                        }
                }

        }
        vals.push(values)
        values=[]
	num = 0
        cnt = 0
        for(i=1;i<=val;i++)
        {
                cnt = cnt + 1
                for(j=1;j<=val;j++)
                {
                        num = num + 1
                        if(j == 3)
                        {
                                values.push(num)
                        }
                }

        }
        vals.push(values)
        values=[]

	//alert(vals)
	//for(i=0;i<vals.length;i++)
	//{
	//	alert(vals[i])
	//}
}

function dump(val)
{
	alert("hhhhhhhhhhhhhhhhhh")
	exist_O=[]
	exist_X=[]
	if(document.getElementById(val).innerHTML == '')
	{
		
	
	X_O = X_O + 1
	alert('X_O'+X_O+win_flag.toString()+mark.toString())
	val1 = parseInt(X_O)
	if( win_flag == 0 && mark == 0)
	{
		alert("NOT COMING")
		mark = 1
		document.getElementById(val).innerHTML = 'X';
		X_vals.push(val)
		for(i=0;i<vals.length;i++)
                {
                        if(X_vals.length >= vals[i].length)
                        {
                                var exist_x = []
                                for(j=0;j<vals[i].length;j++)
                                {

                                        if(X_vals.includes(vals[i][j]))
                                        {
                                                exist_x.push('Y')
                                        }
                                        else
                                        {

                                                exist_x.push('N')
                                        }

                                }
                                const final = [ ];

                                exist_x.map((e,i)=> !final.includes(e) && final.push(e) )
                                if(final == 'Y')
                                {
                                        alert('X is the winner')
                                        win_flag = 1;
                                }
                        }
                }


	}
	if(win_flag == 0 && com_mrk == 0)
	{
		document.getElementById('cont').innerHTML = 'Computer turn';
		com_mrk = 1
		setTimeout(computer_X, 1000);
		//computer_X()
	}
	
	/*else if(win_flag == 0)
	{
		document.getElementById(val).innerHTML = 'O';
		O_vals.push(val)
		for(i=0;i<vals.length;i++)
		{
			if(O_vals.length >= vals[i].length)
			{
				var exist_o = []
				for(j=0;j<vals[i].length;j++)
				{
					
		   			if(O_vals.includes(vals[i][j]))
					{
						exist_o.push('Y')	
					}	
					else
					{
						
						exist_o.push('N')
					}
					
				}
				const final = [ ];

  				exist_o.map((e,i)=> !final.includes(e) && final.push(e) )
				if(final == 'Y')
				{
					alert('O is the winner')
					win_flag = 1;
				}
			}
		}
		
		
	}*/
	}
}
function computer_X()
{
	mark = 0 
	mrk = 0
	var min = 1;
	var max = tot_val
    	var randomn = Math.floor(Math.random() * (max - min + 1)) + min;
	val = randomn;
	if(X_values.includes(randomn))
	{
		computer_X()
	}
	else if(document.getElementById(val).innerHTML != '')
	{
		computer_X()
	}
	else
	{
		val = randomn
		document.getElementById(val).innerHTML = 'O';
                O_vals.push(val)
                for(i=0;i<vals.length;i++)
                {
                        if(O_vals.length >= vals[i].length)
                        {
                                var exist_o = []
                                for(j=0;j<vals[i].length;j++)
                                {

                                        if(O_vals.includes(vals[i][j]))
                                        {
                                                exist_o.push('Y')
                                        }
                                        else
                                        {

                                                exist_o.push('N')
                                        }

                                }
                                const final = [ ];

                                exist_o.map((e,i)=> !final.includes(e) && final.push(e) )
                                if(final == 'Y')
                                {
                                        alert('O is the winner')
                                        win_flag = 1;
                                }
                        }
                }

	}
	com_mrk = 0
	document.getElementById('cont').innerHTML = 'Your turn';
	
}

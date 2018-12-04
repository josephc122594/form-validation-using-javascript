"use strict";
var isToolTip=false;
var event="change keyup paste input";
var hideOnvalid=true;

(window.onload=function() {		
	 	onStart();
	 	function onStart(){
	 		if (!window.jQuery) {  
		        var a = document.createElement("SCRIPT");
			    a.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
			    a.type = 'text/javascript';	   
			    a.onload = function() {
			        func_load();
			    };
			    document.getElementsByTagName("head")[0].appendChild(a);
			}else{
				func_load();
			}
	 	}    
		function func_load(){		
			if(window.jQuery){
				var f=0;
				$("form.form-validation input").each(function(){
					var a=$(this);
					var b=a.attr("type").toLowerCase();	
					a.attr("id","el"+f);
					f++;
					a.on(event,function(){
						var d=checkType(a,b);					
				        if(d){
				        	var c=(a.attr("data-for")!=""? a.attr("data-for") : "");
				        	if(b=="password" && a.attr("for")!=undefined){
				        		if($("input[data-for='"+a.attr("for")+"']").attr("value")==a.attr("value")){
				        			add_style(a,false,a.attr("data-valid"));
				        			a.removeAttr( "pattern");
				        		}else{
				        			add_style(a,true,a.attr("data-invalid"));	
				        			a.attr("pattern",en(a.attr("value")));		        			
				        		}
				        	}else{
				        		$("input[for='"+a.attr("data-for")+"']").attr("value","");
				        		if(c!="" && b!="password"){
					        		$("form input[for='"+c+"']").attr("pattern",a.val());
					        	}
					        	if(a.attr("pattern")!== undefined && a.attr("pattern") !== ""){
					        		if(a.attr("pattern")==a.attr("value")){
					        			add_style(a,false,a.attr("data-valid"));
					        		}else{
					        			add_style(a,true,a.attr("data-invalid"));			        			
					        		}
					        	}else{
					        		add_style(a,false,a.attr("data-valid"));
					        	}
				        	}			        					        	
				        }else{
				            add_style(a,true,a.attr("data-invalid"));
				        }				        
				    });				    
				});

				$("form.form-validation [type='submit']").click(function(){
					$("form.form-validation input").each(function(){
						var a=$(this);
						var b=a.attr("type").toLowerCase();	
						var d=checkType(a,b);					
				        if(d){
				        	var c=(a.attr("data-for")!=""? a.attr("data-for") : "");
				        	if(b=="password" && a.attr("for")!=undefined){
				        		if($("input[data-for='"+a.attr("for")+"']").attr("value")==a.attr("value")){
				        			add_style(a,false,a.attr("data-valid"));
				        			a.removeAttr( "pattern");
				        		}else{
				        			add_style(a,true,a.attr("data-invalid"));	
				        			a.attr("pattern",en(a.attr("value")));		        			
				        		}				        		
				        	}else{				        		
				        		if(c!="" && b!="password"){
					        		$("form input[for='"+c+"']").attr("pattern",a.val());
					        	}
					        	if(a.attr("pattern")!== undefined && a.attr("pattern") !== ""){
					        		if(a.attr("pattern")==a.attr("value")){
					        			add_style(a,false,a.attr("data-valid"));
					        		}else{
					        			add_style(a,true,a.attr("data-invalid"));			        			
					        		}
					        	}else{
					        		add_style(a,false,a.attr("data-valid"));
					        	}
				        	}			        					        	
				        }else{
				            add_style(a,true,a.attr("data-invalid"));
				        }	

				        if(a.val().length==0){
				        	add_style(a,true,a.attr("data-invalid"));
				        }		   
					});
				});
			}else{
				alert("jQuery is undefined");
			}
		}
		/*validate email*/
		function validateEmail(e) {
	        var a = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	        return a.test(e);
	    }
	    //validate phone number
	    function validateTelNo(e) {
	        var a = /^[0-9-()]*$/;
	        return (e.length == 0)? false : (a.test(e));
	    }
	    function validateNo(e) {
	        var a = /^[0-9]*$/;
	        return (e.length == 0)? false : (a.test(e));
	    }
	    function checkType(e,d){
	    	if(d=="email"){
	    		return validateEmail(e.val());
	    	}else if(d=="number"){
	    		return validateNo(e.val());
	    	}else if(d=="tel"){
	    		return validateTelNo(e.val());
	    	}else if(d=="password"){
	    		return true;
	    	}else{
	    		return true;
	    	}
	    }
	    function add_style(e,err,msg){
	    	var c="red";
	    	if(err){
	    		e.css({"border":"1.5px solid red"});
	    		c="red";
	    	}else{
				e.css({"border":"1.5px solid green"});
				c="green";
	    	}
	    	setCusomValidity(e,msg,isToolTip,c);
	    }
	    function setCusomValidity(e,msg,f,c){
	    	if(f){
	    		e.attr("oninvalid","this.setCustomValidity('"+msg+"')");
	   			e.attr("oninput","this.setCustomValidity('')");
	    	}else{
	    		if(c=="green" && hideOnvalid){
	    			$("#error"+e.attr("id")).remove();
	    		}else{
	    			if($("#error"+e.attr("id")).length != 0){
		    			$("#error"+e.attr("id")).html(msg).css({"color":c});
		    		}else{
		    			e.after("<p id='error"+e.attr("id")+"' style='color:"+c+";'>"+msg+"</p>");
		    		}
	    		}	    		
	    	}    	
	    }
	    function en(e)
		{
		    var b = "";
		    for(var i=0; i<e.length;i++)
		    {
		        b += String.fromCharCode((-1)^e.charCodeAt(i));
		    }
		    return b;
		}
})();
// JavaScript Document
$(window).ready(function() {
	//详情页顶部导航效果
	$("#navtx li").each(function() {
        
    });
	
	//详情页商品图的划过效果
    $("#boximg img").each(function() {
        $(this).mouseover(function(){
			var oSrc=$(this).attr("jqimg");	
			$("#boxbig").attr("src",oSrc);
			$(this).addClass("active").siblings().removeClass("active");
		});
    });
});
window.onscroll=function(){	
	//滚动条达到一定地方的时候顶部导航出现
	var t = $(document).scrollTop();
	var h=$("#fullH").height()+$("#id_one").height()+20;
	if(t>h)
	{		
		$("#tabTitle").addClass("topfixed");	
		$("#tabTitle span").show();
		$("#tabContent").css("margin-top","40px");	
		$("#tabContent").removeClass("margintop");	
			
	}
	else
	{
		$("#tabTitle").removeClass("topfixed");
		$("#tabTitle span").hide();
		$("#tabContent").css("margin-top","0");
	}		
}
//选项卡
function tab_show(obj,id,colorstr){
	$(obj).addClass(colorstr).siblings().removeClass(colorstr);
	$("#"+id).show().siblings().hide();
	var t = $(document).scrollTop();
	var h=$("#fullH").height();	
	if(t>h)
	{		
		$(document).scrollTop(687);
		$("#tabTitle span").show();			
	}	
	else
	{
		$("#tabTitle").removeClass("topfixed");
		$("#tabTitle span").hide();
		$("#tabContent").css("margin-top","0");
	}
}

//鼠标移入移出效果
function show_info(id)
{
	 document.getElementById(id).style.display="block";	     
}
function hide_info(id)
{
	 document.getElementById(id).style.display="none";
}

//数量的增加减
function add_nmu()
{
	var zhi;
	if($("#scount").val()=="")
	{zhi=1;}
	else
	{
	zhi=parseInt($("#scount").val())+1;	
	}	
	$("#scount").val(zhi);	
}
function reduce_nmu()
{
	var zhi;
	var zongprice;		
	if((parseInt($("#scount").val())-1)!=0 && $("#scount").val()!="")
	{
		zhi=parseInt($("#scount").val())-1;
		$("#scount").val(zhi);		
	} 		
}	
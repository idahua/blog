// JavaScript Document

//$(function(){
//
//	/*品牌团中品牌图片换动效果的鼠标划过效果*/
//	$(".imgstr_pp,.p-list").mouseover(function(){
//		$(this).children("p,span").show();
//	});
//	$(".imgstr_pp,.p-list").mouseout(function(){
//		$(".imgstr_pp,.p-list").children("p,span").hide();
//	});
//
//});

/*以下是new js*/
window.onscroll=function(){	
	//滚动条达到一定地方的时候顶部导航出现
	var t = $(document).scrollTop();
	var h=$("#header").height()+$('#site_pannel').height()+$('#webbanner').height();
	if(t>h)
	{		
		$("#tabTitle").addClass("topfixed");	
		$("#tabContent").css("margin-top","50px");	
		$("#tabContent").removeClass("margintop");	
			
	}
	else
	{
		$("#tabTitle").removeClass("topfixed");
		$("#tabContent").css("margin-top","0");
	}		
}

function b(){
	h = $(window).height();	
	t = $(document).scrollTop();	
	if(t > h){
		$('#back_id').show();
	}else{
		$('#back_id').hide();		
	}
}

$(function(){
	 $('#fh_back').click(function(){		
		$("#back_id").hide();
	    $('body,html').animate({scrollTop :0},500);
	})
});

$(window).scroll(function(e){
	b();
    loadData();
})

//选项卡操作
function tabEvent(ul,box,colorname){
	$("#"+ul+" li a").each(function(index){
		$(this).live('click',function(){
			$("#"+ul+" li a").removeClass(colorname);
			$("#"+box).children().css('display','none');
			$(this).addClass(colorname);
			$("#"+box).children().eq(index).css('display','block');
		})	
	})
	
}

//点击关闭按钮隐藏相应模块
function hideEvent(cID,hID){
	var closeID=document.getElementById(cID);
	var hideID=document.getElementById(hID);
	closeID.onclick=function(){
		hideID.style.display='none';
	}
    if(hID=='applayerPopup'){
        $('#tc_baobei_img').empty();
    }
}

//获取url指定参数值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return '';
}

/**
 *
 * @desc获取商品
 * @param  type string 请求类型：99 199 299 zdm  page int 页数 从1开始
 * @return 宝贝数据
 */
function getGoods(type,page){
    isloading = true;
//    var query = new Object();
//    query.module = type;
//    if(type=='99'||type=='199'||type=='299'){
//        query.tab = type;
//        query.module = '99';
//    }
//    if(type=='zdm'){
//        query.function = 'newest';
//    }
//    if(type=='brand'){
//        query.function = 'list';
//        query.category = 'all';
//    }
//    if(type=='brandDetail'){
//        query.module = 'brand';
//        query.category = 'all';
//        query.function = 'info';
//        query.brandId = brandId;
//    }
//    querystr = JSON.stringify(query);
//    var client = new Object();
//    client.gender = gender;
//    clientstr = JSON.stringify(client);

    var querystr;
    if(type=='99'){
        querystr = '{"tab":"99","module":"99"}';
    }else if(type=='199'){
        querystr = '{"tab":"199","module":"99"}';
    }else if(type=='299'){
        querystr = '{"tab":"299","module":"99"}';
    }else if(type=='zdm'){
        querystr = '{"function":"newest","module":"zdm"}';
    }else if(type=='brand'){
        querystr = '{"function":"list","module":"brand","category":"all"}';
    }else if(type=='brandDetail'){
        querystr = '{"function":"info","module":"brand","category":"all","brandId":'+brandId+'}';
    }else{
        querystr = '{"tab":"99","module":"99"}';
    }
    var clientstr;
    if(gender==1){
        clientstr = '{"gender":"1"}';
    }else{
        clientstr = '{"gender":"0"}';
    }
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        url: postUrl,
        data: {
            'query':querystr,
            'client':clientstr,
            'page':page
        },
        timeout: 8000,
        dataType:"json",
        success: function(info){
            isloading = false;
            if (info.code == 0) {
                currentPage++;
                hasNext = info.data.hasNext;
                if(type!='brand'){
                    var goods = info.data.productList;
                    makeHtml(goods);
                    if(type == 'brandDetail'){
                        var brandInfo = info.data.brandInfo;
                        makeBrandDetailHtml(brandInfo)
                    }
                }else{
                    var brands = info.data.brandList;
                    makeBrandListHtml(brands);
                }
                if(type!='brandDetail' && page==1){
                    var todayInfo = info.data.info.todayModuleProductInfo;
                    var todayCount = todayInfo.match(/\d+/ig);
                    $('#todayCount').text(todayCount);
                }
            }else{

            }
        },
        error: function(errorInfo) {
            isloading = false;
        }
    });
}

//下拉下载
function loadData(){
    if(isloading || currentPage==1 || !hasNext)
        return;
    totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
    if ($(document).height()-500 <= totalheight) {  // 说明滚动条已达底部
        getGoods(type,currentPage);
    }
}

//99，值得买宝贝列表html生成
function makeHtml(goods){
    var temphtml = '';
    for (order in goods) {
        var item = goods[order];
        var buyUrl = '';
        if (item.chuchuId > 0) {
//            var productUrl = 'http://wx.chuchujie.com/index.php?s=/Product/product_detail/product_id/' + item.chuchuId;
//            var qrImgUrl = "'"+productUrl+"'";
//            var title = "'"+item.title+"'";
//            var oldPrice = "'"+item.oldPrice+"'";
//            var newPrice = "'"+item.newPrice+"'";
//            var discount = "'"+item.discount.toFixed(1)+"'";
//            var tagList = "'"+item.tagList+"'";
//            temphtml = temphtml + '<li class="baobei-item"><a href="javascript:void(0);" onclick="popCcj('+qrImgUrl+','+title+','+oldPrice+','+newPrice+','+discount+','+tagList+')">';
              buyUrl = 'http://wx.chuchujie.com/index.php?s=/WebProduct/product_detail/product_id/'+item.chuchuId;
              buyUrl =  "'"+buyUrl+"'";
              temphtml = temphtml + '<li class="baobei-item"><a href="javascript:;" onclick="baobeiClick('+buyUrl+')">';

        } else {
            var query = JSON.parse(item.query);
            if (query.url) {
                buyUrl = query.url;
            } else {
                buyUrl = 'http://item.taobao.com/item.htm?id=' + item.taobaoId;
            }
            buyUrl =  "'"+buyUrl+"'";
            temphtml = temphtml + '<li class="baobei-item"><a href="javascript:;" onclick="baobeiClick('+buyUrl+')">';
        }
        if (item.status == 1) {
            temphtml = temphtml + '<i class="news">新</i>';
        }
        temphtml = temphtml + '<div class="item-img"><img class="lazyload" src="images/loading.gif" data-original="' + resetImg(item.imgUrl) + '"/></div><div class="item-content ftstyle"><h3 class="item-title">' + item.title + '</h3>';
        temphtml = temphtml + ' <p class="item-salesInfo clearfix"><i class="item-salesInfo-icon">￥</i><span class="item-salesInfo-price">' + item.newPrice + '</span><span class="item-salesInfo-oprice">￥' + item.oldPrice + '</span><span class="item-salesInfo-discount"><em>' + item.discount.toFixed(1) + '</em>折</span><span class="item-salesInfo-sales">销量' + item.saleCount + '</span></p>';
        var tagHtml = '';
        for (tagNo in item.tagList) {
            tagHtml = tagHtml + '<em>' + item.tagList[tagNo] + '</em>';
        }
        temphtml = temphtml + '<p class="item-salesother clearfix"><span>' + tagHtml + '</span></p></div></a></li>';
    }
    $('#baobeilist').append(temphtml);
    $('.lazyload').lazyload({
        effect: 'show'
    });
}

//设置图片尺寸
function resetImg(imgUrl){
    var url = imgUrl;
    var index;
    if(url.indexOf('shopcdn.chuchujie')>0 || url.indexOf('ads-cdn.chuchujie')>0){
        index = url.indexOf('220/h');
        url = url.substr(0,index)+'400';
    }
    if(url.indexOf('qpic.cn')>0){
        url = url.replace('220','400');
    }
    if(url.indexOf('alicdn.com')>0){
        url = url.replace('220x220','400x400');
    }
    return url;
}

//<a href="javascript:;" onclick="brand_url>
//点击宝贝
function baobeiClick(url){
    _czc.push(["_trackEvent", '宝贝总点击', '点击次数','宝贝点击']);
    window.open(url,'_blank')
}

//设置楚楚宝贝弹窗
function popCcj(imgUrl,title,oldPrice,newPrice,discount,tagList){
    $('#tc_baobei_img').empty();
    jQuery('#tc_baobei_img').qrcode({
        width:  157,
        height: 157,
        text :  imgUrl
    });
    var tagHtml = '';
    var tagArr = tagList.split(',')
    for (tagNo in tagArr) {
        tagHtml = tagHtml + '<i>' + tagArr[tagNo] + '</i>';
    }
    var temphtml = '<h2>'+title+'</h2><span>'+tagHtml+'</span><p class="price">￥'+newPrice+'</p><p class="yjprice ft9"><em>原价：￥'+oldPrice+'</em></p><p class="ftpink"><em>'+discount+'折</em></p>';
    $('#tc_baobei_info').html(temphtml);
    $('#applayerPopup').show();
    _czc.push(["_trackEvent", '淘宝宝贝总点击', '点击次数','宝贝点击']);
    _czc.push(["_trackEvent", '微店宝贝', '点击次数','二维码曝光']);
}

//生成品牌团列表
function makeBrandListHtml(brands){
    var temphtml = '';
    for (order in brands) {
        var item = brands[order];
        if(parseInt(item.showType) != 2)
            continue;

        temphtml = temphtml + '<div class="pp-box"><ul class="pp"><li><center><label class="icon"></label></center><span><img src="'+item.logoUrl+'" alt="" /></span><label class="ft ft6">'+item.title+'·'+item.description+'</label><p><font>'+item.discount+'</font>折起</p><label class="ft ft9 pd"><i class="clock"></i><label class="countDown" endTime="'+item.endTime+'"></label></label> <center><label class="icon down"></label> </center> </li></ul><ul class="p-list"><p></p><span><a href="javascript:;" onclick="brandClick('+item.brandId+')" ><img src="images/getinto.png" alt="" /></a></span><li><img class="lazyload" src="images/loading.gif" data-original="'+resetImg(item.productList[0].imgUrl)+'" alt=""/></li></ul></div>';
    }
    $('#brandlist').append(temphtml);
    /*品牌团中品牌图片换动效果的鼠标划过效果*/
    $(".imgstr_pp,.p-list").mouseover(function(){
        $(this).children("p,span").show();
    });
    $(".imgstr_pp,.p-list").mouseout(function(){
        $(".imgstr_pp,.p-list").children("p,span").hide();
    });
    $('.countDown').each(function(){
        CountDown({
            el: $(this),
            endTime: $(this).attr('endTime')
        },function(el, day, hour, minutes, surplus){
            el.html('剩余：'+ day+'天'+hour+'时'+minutes+'分'+surplus+'秒').show();
        });
    });
    $('.lazyload').lazyload({
        effect: 'show'
    });
}

//品牌团点击
function brandClick(brandId){
    _czc.push(["_trackEvent", '品牌团点击', '点击次数','打开内页']);
    window.open('brandDetail.html?brandId='+brandId,'_blank');
}

//倒计时
function CountDown (cfg, fn) {
    if (!cfg.endTime) {
        return false;
    }
    var expireTime = parseInt(cfg.endTime);
    var timer = setInterval(_CountDown, 1000);

    _CountDown();

    function _CountDown () {
        // 当前时间毫秒
        var nowTime = (new Date()).getTime(),
        // 剩余时间
            surplus = expireTime - Math.floor(nowTime/1000), day=hour=minutes=0;
        if (surplus<=0) {
            surplus = 0;
            clearInterval(timer);
        } else {
            // 天
            day = Math.floor(surplus/86400),
                surplus = surplus - day*86400,
                // 时
                hour = Math.floor(surplus/3600),
                surplus = surplus - hour*3600,
                // 分
                minutes = Math.floor(surplus/60),
                surplus = surplus - minutes*60;

            day = day<10?'0'+day:day;
            hour = hour<10?'0'+hour:hour;
            minutes = minutes<10?'0'+minutes:minutes;
            surplus = surplus<10?'0'+surplus:surplus;
        }
        fn(cfg.el, day, hour, minutes, surplus);
    }
}

//品牌团宝贝详情
function makeBrandDetailHtml(brandInfo){
    var tempHtml = '';
    tempHtml = tempHtml + '<em class="ftpink">'+brandInfo.title+'</em> 专场<label class="ftpink ft24">'+brandInfo.discount+'</label>折起<span class="time countDown" endTime="'+brandInfo.endTime+'"></span>';
    $('#brandInfo').html(tempHtml);
    $('.countDown').each(function(){
        CountDown({
            el: $(this),
            endTime: $(this).attr('endTime')
        },function(el, day, hour, minutes, surplus){
            var tmpHtml = '距离本场结束还有：<label class="ftpink">'+day+'</label>天 <label class="ftpink">'+hour+'</label>时 <label class="ftpink">'+minutes+'</label>分 <label class="ftpink">'+surplus+'</label>秒';
            el.html(tmpHtml).show();
        });
    });
}

//设置cookie
function setCookie(c_name,value,expiredays){
    if(expiredays==null)
        expiredays = 1;
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +value+";expires="+exdate.toGMTString();
}

//获取cookie
function getCookie(c_name){
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1){
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
                return (document.cookie.substring(c_start,c_end));
        }
    }
    return ""
}

//切换性别
function switchGender(toGender){
    if(gender==toGender)
        return;
    gender = toGender
    setGenderStyle(toGender);
    setCookie('culiu_gender',toGender,365);
    hasNext = true;
    currentPage = 1;
    $('#baobeilist').html('');
    getGoods(type,currentPage);
}

//设置样式
function setGenderStyle(toGender){
    if(toGender==1){
        $('#switch_boy').removeClass('ft6');
        $('#switch_boy').addClass('ftpink');
        $('#switch_girl').removeClass('ftpink');
        $('#switch_girl').addClass('ft6');
    }else{
        $('#switch_girl').removeClass('ft6');
        $('#switch_girl').addClass('ftpink');
        $('#switch_boy').removeClass('ftpink');
        $('#switch_boy').addClass('ft6');
    }
}
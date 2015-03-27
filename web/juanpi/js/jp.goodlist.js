(function($){
    $(".goods-list li").hover(function(){
        $(this).find(".list-good").hasClass("gone") && $(this).find(".like-ceng").size() != 0 && $(this).find(".like-ico").hasClass("l-active") && $(this).find(".like-ceng").show();
        if($(this).find(".list-good").hasClass("gone")) return;
        if($(this).find(".brand-bd").size() != 0) return;
        $(this).addClass("hover");
        $(this).find(".btn span").html() == "淘宝" && $(this).find(".btn span").html("去淘宝");
        $(this).find(".btn span").html() == "天猫" && $(this).find(".btn span").html("去天猫");
    },function(){
        $(this).find(".like-ceng").hide();
        $(this).removeClass("hover");
        $(this).find(".btn span").html() == "去淘宝" && $(this).find(".btn span").html("淘宝");
        $(this).find(".btn span").html() == "去天猫" && $(this).find(".btn span").html("天猫");
    });

    $(".goods-list li").each(function(){
        if($(this).find('span.price-old').width()>= 55||$(this).find('span.price-current').width()>= 125){
            $(this).find('span.discount').hide();
        }
        if($(this).find('.list-good').hasClass("gone")){
            $(this).find(".btn a").attr("href","javascript:;");
            $(this).find(".btn a").removeAttr("target");

        }
    })

    $(".goods-list .buy-over a").click(function(e){
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }else {//IE浏览器
            window.event.cancelBubble = true;
        }
    });

    

    //卷皮列表页提醒
   

})(jQuery);
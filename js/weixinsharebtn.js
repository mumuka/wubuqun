(function(e){e.fn.weixinsharebtn=function(){return e(this).bind("touchend",function(){var t=".weixinshareshade";e(t)[0]?e(t).css({display:"block"}):(e("body").append("<div class='weixinshareshade'></div>"),console.log(e(t)),e(t).css({"background-color":"rgba(0,0,0,0.8)",position:"fixed",width:"100%",height:"100%",top:"0px",left:"0px","z-index":"99","background-image":"url(http://dev.comeoncloud.net/web/template/template8/styles/images/sharetext.png)","background-size":"50%","background-repeat":"no-repeat","background-position":"right top"}),e(t).bind("touchend",function(){e(t).css({display:"none"})}))}),e(this)}})(jQuery);
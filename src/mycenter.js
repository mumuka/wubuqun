//话题详情页
$("#synecticsbtn").showfixbox("#discuss_exit",".secondtextarea");
//安卓关闭时会打开键盘
$(".secondtextarea").css({"height":$(window).height()-41})
$("#discuss_exit").bind("touchstart",function(){
	$("textarea").blur()
})
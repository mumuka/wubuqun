//话题详情页
$("#jointhisdiscuss").showfixbox("#discuss_exit",".secondtextarea");
//安卓关闭时会打开键盘
$(".secondtextarea").css({"height":$(window).height()-41})
$("#discuss_exit").bind("touchstart",function(){
	$("textarea").blur()
})

//标题描述过多就隐藏
var diss=$(".discusscontainer")
var tth=diss.find(".title").height()
var desh=diss.find(".description").height()
var mainh=tth+desh+34;
if (mainh>100) {
	diss.bind("touchend",function(){
		if(!$(this).attr("style")){
			diss.css({"max-height":mainh});
			diss.find(".dropdownicon").css({"transform":"rotate(90deg)"})
		}else{
			$(this).attr("style","");
			diss.find(".dropdownicon").css({"transform":"rotate(-90deg)"})
		}
	})	
}else{
	diss.find(".dropdownicon").hide()
}